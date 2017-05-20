import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class SqlStorage {

    storage: any;
    DB_NAME: string = '__ionicstorage';

    constructor(public platform: Platform, public sqlite: SQLite) {

        this.platform.ready().then(() => {

            this.sqlite.create({ name: this.DB_NAME, location: 'default' })
                .then((db: SQLiteObject) => {
                    this.storage = db;
                    this.tryInit();
            });
        });
    }

    tryInit() {
    	//this.query('ALTER TABLE _roupas ADD COLUMN img_roupa text');
        this.query('CREATE TABLE IF NOT EXISTS _roupas (id integer not null, value text not null, status_cesto boolean not null,img_roupa text, PRIMARY KEY(id))')
        .catch(err => {
            console.error('Unable to create initial storage tables', err.tx, err.err);
        });
    }

    /**
     * Perform an arbitrary SQL operation on the database. Use this method
     * to have full control over the underlying database through SQL operations
     * like SELECT, INSERT, and UPDATE.
     *
     * @param {string} query the query to run
     * @param {array} params the additional params to use for query placeholders
     * @return {Promise} that resolves or rejects with an object of the form 
     * { tx: Transaction, res: Result (or err)}
     */
    query(query: string, params: any[] = []): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                this.storage.transaction((tx: any) => {
                        tx.executeSql(query, params,
                            (tx: any, res: any) => resolve({ tx: tx, res: res }),
                            (tx: any, err: any) => reject({ tx: tx, err: err }));
                    },
                    (err: any) => reject({ err: err }));
            } catch (err) {
                reject({ err: err });
            }
        });
    }

    /** GET the value in the database identified by the given key. */
    get(id: number): Promise<any> {
        return this.query('select id, value from _roupas where id = ? limit 1', [id])
        .then(data => {
            if (data.res.rows.length > 0) {
                return data.res.rows.item(0).value;
            }
        });
    }

    update(id: number,value: string,statusCesto: boolean,imgRoupa: string): Promise<any> {
        return this.query('update _roupas set value = ?,status_cesto = ?,img_roupa = ? where id = ?', [value,statusCesto,imgRoupa,id]);
    }


    /** SET the value in the database for the given key. */
    set(value: string, statusCesto: boolean, imgRoupa: string): Promise<any> {
        return this.query('insert into _roupas(id,value,status_cesto,img_roupa) values (?,?,?,?)', [null,value,statusCesto,imgRoupa]);
    }

    /** REMOVE the value in the database for the given key. */
    remove(id: number): Promise<any> {
        return this.query('delete from _roupas where id = ?', [id]);
    }

    getAll(): Promise<any>{
    	return this.query('SELECT * from _roupas',[]).then(data => {
    		if (data.res.rows.length > 0) {
                return data;
            }
        });

    }
}