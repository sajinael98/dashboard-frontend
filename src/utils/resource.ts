import { ResourceProps } from "@refinedev/core";

type RESOURCE = ""
export function createResouce(resource: string, dialogForm: boolean = false): ResourceProps {
    const resourceUri = `/${resource}`
    let resourceProps: ResourceProps = {
        name: resource,
        list: resourceUri,
    }
    if(dialogForm){
        resourceProps = {
            ...resourceProps,
        }
    }
    return resourceProps;
}