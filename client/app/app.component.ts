import {Component} from 'angular2/core';
import {RegressionComponent} from './regression.component';

@Component({
    selector: 'app',
    template: `
        <select>
            <option>Regression</option>
        </select>
        <section>
            <regression>Loading...</regression>
        </section>
    `,
    directives: [RegressionComponent]
})

export class AppComponent {
    public data: Array<Array<String>>;

    readFileAsText(event: Event) {
        var input = <HTMLInputElement>event.target,
            files = <FileList>input.files,
            file = <File>files[0],
            reader: FileReader;

        if (file) {
            reader = new FileReader();
            reader.onload = () => this.parseCsv(reader.result);
            reader.readAsText(file);
        }
    }

    parseCsv(csvText: String) {
        var rows = csvText.split(/\r\n|\r|\n/),
            data = rows.map(row => row.split(/,(?![^"][^,]+"[^$])/g)),
            len = data.length;

        if (data[len - 1].length < data[0].length) {
            data.pop();
        }

        this.data = data;
    }
}