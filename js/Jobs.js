septiflowAppRouter.controller("jobsController", ['$scope', '$timeout', '$location', 'modelsrv', '$routeParams', function ($scope, $timeout, $location, modelsrv, $routeParams) {

    (function () {
        modelsrv.db.changes({
            since: 'now',
            live: true
        }).on('change', showJobs);
    })();

    showJobs();

    function showJobs() {
        modelsrv.getJobs(function (err, response) {

            if (response) {    
                $scope.$apply(function () { $scope.jobs = response.rows; });
            };

        });
    };

    $scope.addJob = function () {
        var job = {
            _id: new Date().toISOString(),
            name: null,
            time: null,
            workitems: [{_id: '616161616161', name: 'Workitem1', cost: 90.98, docType: 'workitem'}],
            docType: "job",
        };

        job.name = $scope.jobName;
        job.time = $scope.jobTime;

        modelsrv.put(job, function (err, updated) {
            if (!err) {
                //if (updated)
                    //alert("Updated Job!");
                //else
                    //alert("Saved a new job!");
            }
        });

        $scope.jobName = '';
        $scope.jobTime = '';
    }

    $scope.addWorkItem = function (jobId) {
        var workitem = {
            _id: new Date().toISOString(),
            name: null,
            cost: null,
            docType: "workitem",
        };

        //workitem.name = $scope.jobs.doc.workitem.name;
        //workitem.cost = $scope.jobs.doc.workitem.cost;

        workitem.name = $scope.workitemname;
        workitem.cost = $scope.workitemcost;

        modelsrv.put(workitem, function (err, updated) {
            if (!err) {
                if (updated)
                alert("Updated workitem!");
                else
                alert("Saved a new workitem!");
            }
        });

        $scope.job.doc.workitem.name = '';
        $scope.job.doc.workitem.cost = '';
    };

    $scope.deleteJob = function (jobId) {

        modelsrv.delete(function () {
            //if (error)
            //    alert("error, failed to delete job ID");
        });

    }

}]);