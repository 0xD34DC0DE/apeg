use std::collections::HashMap;
use crate::persistence2::entity::Entity;
use crate::persistence::data_extension::Error;

pub type Result<T> = std::result::Result<T, Error>;
pub type ID = bson::oid::ObjectId;

pub(crate) struct Store {
    db: jammdb::DB,
    bucket_name: String,
    uncommitted: HashMap<ID, Entity>,
}

impl Store {
    pub fn new(db: jammdb::DB, bucket_name: String) -> Store {
        Store {
            db,
            bucket_name,
            uncommitted: HashMap::new(),
        }
    }

    pub fn save(&mut self, entity: &mut Entity) -> Result<()> {
        self.uncommitted.insert(entity.id, entity.clone());
        Ok(())
    }

    pub fn delete(&mut self, entity: &mut Entity) -> Result<()> {
        self.uncommitted.remove(&entity.id);
        Ok(())
    }

    pub fn commit(&mut self) -> Result<()> {
        let mut bucket = self.db.bucket(&self.bucket_name)?;
        for (id, entity) in self.uncommitted.drain() {
            bucket.insert(id, entity)?;
        }
        Ok(())
    }

    pub fn rollback(&mut self) -> Result<()> {
        self.uncommitted.clear();
        Ok(())
    }

    pub fn get(&self, id: &ID) -> Result<&Entity> {
        let entity = self.uncommitted.get(id);
        if let Some(entity) = entity {
            return Ok(entity);
        }
        let bucket = self.db.bucket(&self.bucket_name)?;
        let entity = bucket.get(&id)?;
        Ok(entity)
    }
}