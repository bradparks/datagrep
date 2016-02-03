///<reference path='../../node_modules/immutable/dist/Immutable.d.ts'/>
import {Injectable} from 'angular2/core';
import * as Immutable from 'immutable';

@Injectable()
export class DataService {
    private _data: Array<Array<string>>

    setData(data: Array<Array<string>>) {
        this._data = data;
    }

    getData() {
        return this.clone(this._data);
    }

    clone(data: Array<Array<string>>) {
        var immutableData = Immutable.fromJS(data);
        return immutableData.toJS();
    }
}