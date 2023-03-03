use bson::oid::ObjectId;
use jammdb::DB as JammDB;
use persistence_internal::SerializedEntity;
use crate::Persister;
use crate::persister::Error;


struct EmbeddedPersister {
    db: JammDB,
}

impl Persister for EmbeddedPersister {
    fn create(&mut self, bucket: &str, value: SerializedEntity) -> Result<(), Error> {
        todo!()
    }

    fn create_all(&mut self, bucket: &str, values: &Vec<SerializedEntity>) -> Result<(), Error> {
        todo!()
    }

    fn update(&mut self, bucket: &str, value: SerializedEntity) -> Result<(), Error> {
        todo!()
    }

    fn update_all(&mut self, bucket: &str, values: &Vec<SerializedEntity>) -> Result<(), Error> {
        todo!()
    }

    fn load(&self, bucket: &str, id: &ObjectId) -> Result<SerializedEntity, Error> {
        todo!()
    }

    fn load_all(&self, bucket: &str) -> Result<Vec<SerializedEntity>, Error> {
        todo!()
    }

    fn try_delete(&mut self, bucket: &str, id: &ObjectId) -> Result<(), Error> {
        todo!()
    }

    fn delete(&mut self, bucket: &str, id: &ObjectId) -> Result<(), Error> {
        todo!()
    }
}