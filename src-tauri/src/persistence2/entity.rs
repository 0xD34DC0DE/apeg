use std::cell::RefCell;
use bson::Bson;
use bson::oid::ObjectId;
use serde::de::DeserializeOwned;

use crate::persistence2::store::{Result, Store};

pub struct Entity {
    pub id: ObjectId,
    pub name: String,
    pub tags: Vec<String>,
    pub store: RefCell<Store>,
    pub data: Bson,
}

impl Entity {
    pub fn save(&mut self) -> Result<()> {
        self.store.save(self)
    }

    pub fn delete(&mut self) -> Result<()> {
        self.store.delete(self)
    }

    pub fn to<T: DeserializeOwned>(&self) -> Result<T> {
        self.store.to(self)
    }
}