use std::collections::hash_map::DefaultHasher;
use std::hash::{Hash, Hasher};
// #[allow(unused)]
// use bson::oid::ObjectId;
// #[allow(unused)]
// use persistence::{Persist, use_id};
use persistence::Persistable;
use serde::{Deserialize, Serialize};
use crate::module::version::NodeRendererHandle;

#[derive(Serialize, Debug, Clone, Default)]
struct NodeRenderer {
    pub name: String,
    pub module: String,
    pub version: String,
    #[serde(skip_serializing)]
    handle: NodeRendererHandle,
}

impl NodeRenderer {
    pub fn new(name: String, module: String, version: String) -> Self {
        let mut node_renderer = NodeRenderer::default();
        node_renderer.name = name;
        node_renderer.module = module;
        node_renderer.version = version;

        let mut hasher = DefaultHasher::new();
        node_renderer.name.hash(&mut hasher);
        node_renderer.module.hash(&mut hasher);
        node_renderer.version.hash(&mut hasher);
        node_renderer.handle = hasher.finish();

        return node_renderer;
    }
}

impl<'de> Deserialize<'de> for NodeRenderer {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
        where
            D: serde::de::Deserializer<'de>,
    {
        let (name, module, version) = Deserialize::deserialize(deserializer)?;
        Ok(NodeRenderer::new(name, module, version))
    }
}


// #[use_id]
// #[derive(Persist, Serialize, Deserialize, Debug, Clone, Default)]
#[derive(Serialize, Deserialize, Debug, Clone, Default)]
struct NodeData {
    name: String,
    label: String,
    description: String,
    module: String,
    module_version: String,
    position: (f64, f64),
    renderer: NodeRendererHandle,
}

pub trait Node: Persistable {
    fn get_data(&self) -> &NodeData;
    fn get_data_mut(&mut self) -> &mut NodeData;
}
