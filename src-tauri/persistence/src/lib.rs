pub use persistence_macro::Persist;
pub use persistence_macro::use_id;
pub use persister::Persister;

pub use persistence_internal::SerializedEntity;
pub use persistence_internal::SerializeEntity;
pub use persistence_internal::Persistable;

mod persister;
mod embedded_persister;

