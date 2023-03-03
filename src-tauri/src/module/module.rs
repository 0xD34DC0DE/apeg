use crate::module::version::Version;

struct ModuleIdentifier {
    pub name: String,
    pub version: Version,
}

struct ModuleInfo {
    pub identifier: ModuleIdentifier,
    pub description: String,
    pub author: String,
    pub license: String,
    pub homepage: String,
    pub repository: String,
    pub keywords: Vec<String>,
    pub dependencies: Vec<ModuleIdentifier>,
}

struct Module {
    pub info: ModuleInfo,
    pub path: String,
}

enum NodeEditorComponentType {
    Node,
    Edge,
    Handle,
    NodeGrouper,
    NodeFactory,
}

enum ViewType {
    View2D,
    View3D,
}

enum ComponentType {
    Node(NodeEditorComponentType),
    Viewer(ViewType),
    Editor(ViewType),
    Menu,
    Service,
    Compiler
}

struct Component {
    pub name: String,
    pub version: Version,
    pub description: String,
    pub module: ModuleIdentifier,
    pub component_type: ComponentType,
}