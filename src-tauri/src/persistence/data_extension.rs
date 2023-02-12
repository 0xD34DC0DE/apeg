use serde::{Serialize, Deserialize};
use jammdb::{Data, Bucket};
use serde::de::DeserializeOwned;

pub type Result<T> = std::result::Result<T, Error>;

#[derive(Debug)]
pub enum Error {
    Jammdb(jammdb::Error),
    BsonDe(bson::de::Error),
    BsonSer(bson::ser::Error),
}

impl From<jammdb::Error> for Error {
    fn from(err: jammdb::Error) -> Error {
        Error::Jammdb(err)
    }
}

impl From<bson::de::Error> for Error {
    fn from(err: bson::de::Error) -> Error {
        Error::BsonDe(err)
    }
}

impl From<bson::ser::Error> for Error {
    fn from(err: bson::ser::Error) -> Error {
        Error::BsonSer(err)
    }
}

impl std::fmt::Display for Error {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            Error::Jammdb(err) => write!(f, "Jammdb error: {}", err),
            Error::BsonDe(err) => write!(f, "Bson deserialization error: {}", err),
            Error::BsonSer(err) => write!(f, "Bson serialization error: {}", err),
        }
    }
}

impl std::error::Error for Error {
    fn source(&self) -> Option<&(dyn std::error::Error + 'static)> {
        match self {
            Error::Jammdb(err) => Some(err),
            Error::BsonDe(err) => Some(err),
            Error::BsonSer(err) => Some(err),
        }
    }
}

pub trait DataExt<'s: 'de, 'de> {
    fn get<T: Deserialize<'de>>(&'s self) -> Result<T>;
}

impl<'s: 'de, 'de> DataExt<'s, 'de> for Data<'s, 'de> {
    fn get<T: Deserialize<'de>>(&'s self) -> Result<T> {
        let data = self.kv().value();
        let value = bson::from_slice(data)?;
        Ok(value)
    }
}

pub trait BucketExt<'k> {
    fn get_as<T: DeserializeOwned>(&self, key: &str) -> Option<Result<T>>;
    fn insert_as<T: Serialize>(&self, key: &'k str, value: &T) -> Result<()>;
}

impl<'k: 'tx, 'b, 'tx> BucketExt<'k> for Bucket<'b, 'tx> {
    fn get_as<T: DeserializeOwned>(&self, key: &str) -> Option<Result<T>> {
        self.get(key).map(|data| data.get())
    }

    fn insert_as<T: Serialize>(&self, key: &'k str, value: &T) -> Result<()> {
        let value = bson::to_vec(value)?;
        self.put(key, value)?;
        Ok(())
    }
}
