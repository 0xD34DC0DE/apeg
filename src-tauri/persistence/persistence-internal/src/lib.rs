use bson::Bson;
use bson::oid::ObjectId;
use serde::Serialize;
use serde::de::DeserializeOwned;

#[derive(Debug)]
pub struct SerializedEntity(pub (ObjectId, Bson));

pub trait SerializeEntity {
    fn serialize_entity(&mut self) -> Result<SerializedEntity, bson::ser::Error>;
}

pub trait Persistable: Serialize + DeserializeOwned + SerializeEntity {
    fn set_id(&mut self, id: ObjectId);
    fn get_id(&mut self) -> &ObjectId;
}