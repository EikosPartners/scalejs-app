import { observable } from 'knockout';
import dataservice from 'dataservice';

export default function main() {
    let metadata = observable();

    dataservice.ajax("/pjson?name=pages/helloworld").then((data) => {
        metadata(data);
    });

    return {
        metadata
    };
}