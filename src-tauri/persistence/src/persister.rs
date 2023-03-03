use serde::de::DeserializeOwned;
use serde::Serialize;
use persistence_internal::SerializedEntity;
use bson::oid::ObjectId;
use bson::de::Error as BsonDeserializationError;
use bson::ser::Error as BsonSerializationError;

#[derive(Debug)]
pub enum Error {
    DuplicateID(String),
    DuplicateBucket(String),
    IDNotFound(String),
    BucketNotFound(String),
    PersistenceError(String),
    SerializationError(BsonSerializationError),
    DeserializationError(BsonDeserializationError),
}

pub trait Persister {
    fn create(&mut self, bucket: &str, value: SerializedEntity)-> Result<(), Error>;
    fn create_all(&mut self, bucket: &str, values: &Vec<SerializedEntity>) -> Result<(), Error>;

    fn update(&mut self, bucket: &str, value: SerializedEntity) -> Result<(), Error>;
    fn update_all(&mut self, bucket: &str, values: &Vec<SerializedEntity>) -> Result<(), Error>;

    fn load(&self, bucket: &str, id: &ObjectId) -> Result<SerializedEntity, Error>;
    fn load_all(&self, bucket: &str) -> Result<Vec<SerializedEntity>, Error>;

    fn try_delete(&mut self, bucket: &str, id: &ObjectId) -> Result<(), Error>;
    fn delete(&mut self, bucket: &str, id: &ObjectId) -> Result<(), Error>;
}