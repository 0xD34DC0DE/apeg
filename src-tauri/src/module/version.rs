use std::fmt;

use serde::{Deserialize, Serialize, Serializer};
use serde::de::Error as SerdeError;

pub type NodeRendererHandle = u64;

#[derive(Clone, Default, PartialEq)]
pub struct Version {
    major: u32,
    minor: u32,
    patch: u32,
}

impl Version {
    pub fn new(major: u32, minor: u32, patch: u32) -> Self {
        Version {
            major,
            minor,
            patch,
        }
    }
}

impl fmt::Display for Version {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}.{}.{}", self.major, self.minor, self.patch)
    }
}

impl fmt::Debug for Version {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}.{}.{}", self.major, self.minor, self.patch)
    }
}

impl Serialize for Version {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: Serializer,
    {
        serializer.serialize_str(&format!("{}.{}.{}", self.major, self.minor, self.patch))
    }
}

impl<'de> Deserialize<'de> for Version {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
        where
            D: serde::de::Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;

        let mut split = s.split(".");
        let split_count = split.clone().count();
        if split_count != 3 {
            return Err(SerdeError::custom(format!("Invalid version format, expected 3 parts, got {}", split_count)));
        }

        let major = split.next().unwrap().parse::<u32>().map_err(SerdeError::custom)?;
        let minor = split.next().unwrap().parse::<u32>().map_err(SerdeError::custom)?;
        let patch = split.next().unwrap().parse::<u32>().map_err(SerdeError::custom)?;

        Ok(Version::new(major, minor, patch))
    }
}

#[test]
fn test_serialization() {
    let version = Version::new(1, 2, 3);

    let result = std::io::BufWriter::new(Vec::new());
    let mut serializer = serde_json::Serializer::new(result);
    serde::Serialize::serialize(&version, &mut serializer).unwrap();

    let result = serializer.into_inner().into_inner().unwrap();
    let result = String::from_utf8(result).unwrap();
    assert_eq!(result, "\"1.2.3\"");
}

#[test]
fn test_deserialization() {
    let version = Version::new(1, 2, 3);
    let string = "\"1.2.3\"";
    let result = serde_json::from_str::<Version>(string).unwrap();
    assert_eq!(result, version);
}