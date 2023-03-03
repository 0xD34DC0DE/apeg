extern crate bson;
extern crate proc_macro;
extern crate serde;
extern crate persistence_internal;

use proc_macro::TokenStream;

use quote::quote;
use syn::{DeriveInput, ItemStruct, parse_macro_input};
use syn::parse::Parser;

#[proc_macro_derive(Persist)]
pub fn derive_entity(input: TokenStream) -> TokenStream {
    let ast = syn::parse(input).unwrap();
    impl_derive_entity(&ast)
}

fn impl_derive_entity(ast: &DeriveInput) -> TokenStream {
    let name = &ast.ident;
    let gen = quote! {
        impl persistence::Persistable for #name {
            fn set_id(&mut self, id: ObjectId) {
                self._id = Some(id);
            }
            fn get_id(&mut self) -> &ObjectId {
                if let None = self._id {
                    self._id = Some(ObjectId::new());
                }
                &self._id.as_ref().unwrap()
            }
        }
        impl persistence::SerializeEntity for #name {
            fn serialize_entity(&mut self) -> Result<persistence::SerializedEntity, bson::ser::Error> {
                Ok(persistence::SerializedEntity((self.get_id().clone(), bson::to_bson(self)?)))
            }
        }
    };
    gen.into()
}

#[proc_macro_attribute]
pub fn use_id(args: TokenStream, input: TokenStream) -> TokenStream {
    let mut item_struct = parse_macro_input!(input as ItemStruct);
    let _ = parse_macro_input!(args as syn::parse::Nothing);

    if let syn::Fields::Named(ref mut fields) = item_struct.fields {
        fields.named.push(
            syn::Field::parse_named
                .parse2(quote! {
                    #[serde(skip_serializing)]
                    _id: Option<bson::oid::ObjectId>
                })
                .unwrap(),
        );
    }

    return quote! {
        #item_struct
    }
        .into();
}