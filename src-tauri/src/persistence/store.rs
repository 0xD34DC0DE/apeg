use std::collections::HashMap;
use bson::Bson;
use serde::{Serialize};
use crate::persistence::data_extension::Error;
use crate::persistence::entity::{Entity, ID};

pub type Result<T> = std::result::Result<T, Error>;

pub trait Store<T: Serialize + Clone> {
    fn add(&mut self, data: &T) -> Result<&Entity<T>>;
    fn save(&mut self, entity: &Entity<T>) -> Result<()>;
}

pub struct MonomorphicStore<'db, T: Serialize + Clone> {
    db: &'db jammdb::DB,
    bucket_name: String,
    uncommitted: HashMap<ID, Entity<'db, T>>,
}

impl<'db, T: Serialize + Clone> MonomorphicStore<'db, T> {
    pub fn new(db: &'db jammdb::DB, bucket_name: String) -> MonomorphicStore<'db, T> {
        MonomorphicStore {
            db,
            bucket_name,
            uncommitted: HashMap::new(),
        }
    }
}

impl<'db, T: Serialize + Clone> Store<T> for MonomorphicStore<'db, T> {
    fn add(&mut self, data: &T) -> Result<&Entity<'db, T>> {
        let entity = Entity::new(self, data.clone(), None, None);
        self.uncommitted.insert(entity.id.clone(), entity);
        Ok(self.uncommitted.get(&entity.id).unwrap())
    }

    fn save(&mut self, entity: &Entity<'_, T>) -> Result<()> {
        self.uncommitted.insert(entity.id.clone(), entity.clone());
        Ok(())
    }
}

pub struct PolymorphicStore<'db> {
    db: &'db jammdb::DB,
    bucket_name: String,
    uncommitted: HashMap<ID, Entity<'db, Bson>>,
}

impl<'db> PolymorphicStore<'db> {
    pub fn new(db: &'db jammdb::DB, bucket_name: String) -> PolymorphicStore<'db> {
        PolymorphicStore {
            db,
            bucket_name,
            uncommitted: HashMap::new(),
        }
    }
}

impl<'db> Store<Bson> for PolymorphicStore<'db> {
    fn add(&mut self, data: &Bson) -> Result<&Entity<'db, Bson>> {
        let entity = Entity::new(self, data.clone(), None, None);
        self.uncommitted.insert(entity.id.clone(), entity);
        Ok(self.uncommitted.get(&entity.id).unwrap())
    }

    fn save(&mut self, entity: &Entity<'_, Bson>) -> Result<()> {
        self.uncommitted.insert(entity.id.clone(), entity.clone());
        Ok(())
    }
}



