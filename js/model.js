model = function () {

    var thisClass = this;

    var syncDom = document.getElementById('sync-wrapper');

    var db = new PouchDB('startbutton', { 'auto_compaction': true, 'adapter': 'websql' });

    this.db = db;

    //db.changes({
    //    since: 'now',
    //    live: true
    //}).on('change', showJobs);

    function saveDesignDoc(callback) {
        var ddoc = {
            _id: '_design/_views',
            views: {
                jobs: {
                    map: function (doc) {
                        if (doc.docType === 'job')
                            emit(doc._id);
                    }.toString()
                },
            }
        };
        thisClass.put(ddoc, function (err, doc) {
            if (err) {
                alert('ERROR: failed to save the design doc');
            }
        });
    };

    this.getJobs = function (callback) {
        db.query('_views/jobs', { reduce: false,  limit: 100, descending: true, include_docs: true }, function (err, response) {
            if (err) {
                alert("ERROR: Failed to get jobs")
            }
            callback(err, response);
        });
    };

    this.delete = function (jobId) {
        db.get(jobid, function (doc) {
            return db.remove(doc);
        });
    };

    function sync() {
        syncDom.setAttribute('data-sync-state', 'syncing');
        var opts = { live: true };
        db.replicate.to(remoteCouch, opts, syncError);
        db.replicate.from(remoteCouch, opts, syncError);
    }

    function syncError() {
        syncDom.setAttribute('data-sync-state', 'error');
    }

    //This method assumes the object has an "_id" property.
    this.put = function (pouchDbCompatibleObject,callback) {
        var me = console.log("model.put");
        var updated = false;
        //This operation strips the functions from the object
        var foo = angular.toJson(pouchDbCompatibleObject);
        var bar = JSON.parse(foo);
        thisClass.db.get(bar._id, function (err, doc) {
            if (!err) {
                bar._rev = doc._rev;
                updated = true;
            }
            thisClass.db.put(bar, function (err,response) {
                if (err) {
                    alert(JSON.stringify(err));
                }
                callback(err,updated);
            });
        });
    };
    this.get = function (docId, callback) {
        var me = console.log("model.get");
        db.get(docId,
         function (err, doc) {
             if (err) {
                 alert(JSON.stringify(err));
             }
             callback(err, doc);
         });
    };

    saveDesignDoc();
};
