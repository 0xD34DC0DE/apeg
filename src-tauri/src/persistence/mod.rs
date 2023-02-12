use std::collections::HashMap;

use jammdb::{DB};
use serde::{Deserialize, Serialize};
use crate::node::Node;

use crate::persistence::data_extension::{BucketExt, Error as DataError};
use crate::persistence::store::{PolymorphicStore, Store};

pub(crate) mod data_extension;
pub(crate) mod store;
pub(crate) mod entity;

pub type Result<T> = std::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    KeyNotFound,
    ProjectAlreadyExists,
    Data(DataError),
}

impl From<DataError> for Error {
    fn from(err: DataError) -> Error {
        Error::Data(err)
    }
}

impl From<jammdb::Error> for Error {
    fn from(err: jammdb::Error) -> Error {
        Error::Data(err.into())
    }
}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Error::KeyNotFound => write!(f, "Key not found"),
            Error::ProjectAlreadyExists => write!(f, "Project already exists"),
            Error::Data(err) => write!(f, "Data error: {}", err),
        }
    }
}

impl std::error::Error for Error {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            Error::KeyNotFound => None,
            Error::ProjectAlreadyExists => None,
            Error::Data(err) => Some(err),
        }
    }
}

pub struct Project<'db> {
    pub project_info: ProjectInfo,
    pub nodes: PolymorphicStore<'db>,
    db: DB,
}

impl<'db> Project<'db> {
    pub(crate) fn open(path: &str) -> Result<Project> {
        let db = DB::open(path)?;
        let project_info = {
            let tx = (&db).tx(false)?;
            let bucket = tx.get_bucket("project_info")?;
            bucket.get_as::<ProjectInfo>("info")
        }.ok_or(Error::KeyNotFound)??;

        Ok(Project {
            project_info,
            nodes: PolymorphicStore::new(&db, "nodes".to_string()),
            db,
        })
    }

    pub fn create_new_project(path: &str, project_info: ProjectInfo) -> Result<Project> {
        let db = DB::open(path)?;
        let tx = db.tx(true)?;
        let bucket = tx.create_bucket("project_info")?;

        bucket.insert_as("info", &project_info)?;

        tx.commit()?;

        Ok(Project {
            project_info,
            nodes: PolymorphicStore::new(&db, "nodes".to_string()),
            db,
        })
    }

    // fn create(&self, object: &ProjectObject) {}
    //
    // fn read(&self, id: &str) {}
    //
    // fn update(&self, object: &ProjectObject) {}
    //

    fn commit(&self) {}

    fn update_project_info(&mut self, project_info: ProjectInfo) {
        self.project_info = project_info.clone();
    }

    // fn delete(&self, id: &str) {}
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct ProjectInfo {
    pub name: String,
    pub version: String,
    pub description: String,
}

impl ProjectInfo {
    pub(crate) fn new(name: &str, version: &str, description: &str) -> ProjectInfo {
        return ProjectInfo {
            name: String::from(name),
            version: String::from(version),
            description: String::from(description),
        };
    }
}
