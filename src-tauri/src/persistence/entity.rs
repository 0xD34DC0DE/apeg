use std::rc::Rc;
use serde::{Deserialize, Serialize};
use crate::persistence::data_extension::{Error as DataError};
use crate::persistence::store::Store;

pub type ID = bson::oid::ObjectId;
pub type Result<T> = std::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    StoreNotSet,
    DataErr(DataError),
}

impl From<DataError> for Error {
    fn from(err: DataError) -> Error {
        Error::DataErr(err)
    }
}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Error::StoreNotSet => write!(f, "Store not set"),
            Error::DataErr(err) => write!(f, "Data error: {}", err),
        }
    }
}

impl std::error::Error for Error {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            Error::StoreNotSet => Some(self),
            Error::DataErr(err) => Some(err),
        }
    }
}

#[derive(Serialize, Deserialize, Clone)]
pub struct Entity<T: Serialize + Clone> {
    pub id: ID,
    pub name: String,
    pub tags: Vec<String>,
    #[serde(skip)]
    store: Option<Rc<dyn Store<T>>>,
    pub data: T,
}

impl<'s, T: Serialize + Clone> Entity<T> {
    pub fn new(store: &'s dyn Store<T>, data: T, name: Option<String>, tags: Option<Vec<String>>) -> Self {
        Entity {
            id: ID::new(),
            name: name.unwrap_or(String::new()),
            tags: tags.unwrap_or(Vec::new()),
            store: Some(store),
            data,
        }
    }

    fn save(&mut self) -> Result<()> {
        if let Some(store) = self.store.as_mut() {
            store.save(self).map_err(|err| err.into())
        } else {
            Err(Error::StoreNotSet)
        }
    }
}