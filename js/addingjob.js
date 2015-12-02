septiflowAppRouter.controller("addingjobController", ['$scope', '$timeout', '$location', 'modelsrv', '$routeParams', 'DEFAULT_INVOICE', 'LocalStorage', 'Currency', 'modals',
    function ($scope, $timeout, $location, modelsrv, $routeParams, DEFAULT_INVOICE, LocalStorage, Currency, modals) {
        $scope.gpsstatus = 'Route to GPS';

        var options = {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 100,
            targetHeight: 100,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            var image = document.getElementById('myImage');
            image.src = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            // error
        });


        //temporary variable to get different time
        $scope.date = new Date();

        $scope.jobs = [
            {
                _id: 1,
                name: 'Adam Smith',
                time: '12:25 PM',
                address: '1424 Hill Avenue',
                city: 'Melbourne',
                state: 'FL',
                zip: '32940',
                statuscollection: [
                    { name: "Off-Site" },
                    { name: "Enroute" },
                    { name: "On-Site" },
                ],
                workitems: [
                    { _id: new Date().toISOString(), name: 'Pump Tank', size: '1000', cost: 900.00, iscomplete: false, docType: "workitem" },
                    { _id: new Date().toISOString(), name: 'Septic Cover', size: null, cost: 450.00, iscomplete: false, docType: "workitem" },
                    { _id: new Date().toISOString(), name: 'Storage', size: null, cost: 150.00, iscomplete: false, docType: "workitem" },
                ],
                docType: "job",
            },
            {
                _id: 2,
                name: 'Joanna Films',
                time: '4:30 PM',
                address: '9363 Nelson Park Circle',
                city: 'Orlando',
                state: 'FL',
                zip: '32765',
                statuscollection: [
                    { name: "Off-Site", isselected: 1 },
                    { name: "Enroute", isselected: 0 },
                    { name: "On-Site", isselected: 0 },
                ],
                workitems: [
                    { _id: new Date().toISOString(), name: 'Pump Tank', size: '1000', cost: 900.00, iscomplete: false, docType: "workitem" },
                    { _id: new Date().toISOString(), name: 'Septic Cover', size: null, cost: 450.00, iscomplete: false, docType: "workitem" },
                    { _id: new Date().toISOString(), name: 'Storage', size: null, cost: 150.00, iscomplete: false, docType: "workitem" },
                ],
                docType: "job",
            },
            {
                _id: 3,
                name: 'Vandolph C. Reyes',
                time: '1:30 PM',
                address: 'Guizo St.',
                city: 'Cebu',
                state: 'PH',
                zip: '6000',
                statusselected: 0,
                statuscollection: [
                    { name: "Off-Site" },
                    { name: "Enroute" },
                    { name: "On-Site" },
                ],
                workitems: [
                    { _id: new Date().toISOString(), name: 'Pump Tank', size: '1000', cost: 900.00, iscomplete: false, docType: "workitem" },
                    { _id: new Date().toISOString(), name: 'Septic Cover', size: null, cost: 450.00, iscomplete: false, docType: "workitem" },
                    { _id: new Date().toISOString(), name: 'Storage', size: null, cost: 150.00, iscomplete: false, docType: "workitem" },
                ],
                docType: "job",
            },
        ];

        $scope.activategpsCommand = function () {
            //
        };

        (function init() {
            // Attempt to load invoice from local storage
            !function () {
                var invoice = LocalStorage.getInvoice();
                $scope.invoice = invoice ? invoice : DEFAULT_INVOICE;

                $scope.getIds = function (JobsId) {
                    if (JobsId == 1) {
                        return $scope.invoice.items1;
                    } else if (JobsId == 2) {
                        return $scope.invoice.items2;
                    } else {
                        return $scope.invoice.items3;
                    }

                }
            }();

        })()

        // Calculates the sub total of the invoice
        $scope.invoiceSubTotal = function (JobsId) {
            var total = 0.00;

            if (JobsId == 1) {
                angular.forEach($scope.invoice.items1, function (JobsId, key) {
                    total += (1 * JobsId.cost);
                });
                return total;
            } else if (JobsId == 2) {
                angular.forEach($scope.invoice.items2, function (JobsId, key) {
                    total += (1 * JobsId.cost);
                });
                return total;
            } else {
                angular.forEach($scope.invoice.items3, function (JobsId, key) {
                    total += (1 * JobsId.cost);
                });
                return total;
            }
        };

        // Clears the local storage
        $scope.clearLocalStorage = function () {
            var confirmClear = confirm('Are you sure you would like to clear the invoice?');
            if (confirmClear) {
                LocalStorage.clear();
                setInvoice(DEFAULT_INVOICE);
            }
        };

        function show() {
            var ids = $scope.jobs.map(function (o) {
                return o._id;
            });
            for (id in ids) {
                index = ids[id];
                console.log(ids[id]);
            }
        }
        show();

        $scope.count1 = [];
        $scope.count2 = [];
        $scope.count3 = [];

        $scope.checkTrue = function (JobsId, check, index) {
            if (JobsId == 1) {
                if (!check) {
                    $scope.count1.push(index);
                    console.log($scope.count1);
                    $scope.forBut(JobsId);
                    console.log('Data ' + JobsId + ' number of check: ' + $scope.count1.length);
                } else {
                    $scope.count1.splice(index, 1);
                    console.log($scope.count1);
                    $scope.forBut(JobsId);
                    console.log('Data ' + JobsId + ' number of uncheck: ' + $scope.count1.length);

                }
            } else if (JobsId == 2) {
                if (!check) {
                    $scope.count2.push(index);
                    $scope.forBut(JobsId);
                    console.log('Data ' + JobsId + ' number of check: ' + $scope.count2.length);
                } else {
                    $scope.count2.splice(index, 1);
                    $scope.forBut(JobsId);
                    console.log('Data ' + JobsId + ' number of uncheck: ' + $scope.count2.length);
                }
            } else {
                if (!check) {
                    $scope.count3.push(index);
                    $scope.forBut(JobsId);
                    console.log('Data ' + JobsId + ' number of check: ' + $scope.count3.length);
                } else {
                    $scope.count3.splice(index, 1);
                    console.log($scope.count3);
                    $scope.forBut(JobsId);
                    console.log('Data ' + JobsId + ' number of uncheck: ' + $scope.count3.length);
                }
            }
        }

        $scope.removeItem = function (JobsId, index) {
            if (JobsId == 1) {
                $scope.invoice.items1.splice($scope.invoice.items1.indexOf(JobsId), 1);
                $scope.count1.splice(index, 1);
            } else if (JobsId == 2) {
                $scope.invoice.items2.splice($scope.invoice.items2.indexOf(JobsId), 1);
                $scope.count2.splice(index, 1);
            } else {
                $scope.invoice.items3.splice($scope.invoice.items3.indexOf(JobsId), 1);
                $scope.count3.splice(index, 1);
            }
        };

        //for modal box
        $scope.showModal = function (JobsId) {
            var promise = modals.open("alert");
            $scope.clientId = (modals.params().message || JobsId);
            $scope.close = modals.resolve;
        }

        $scope.serviceUpdate = function (selected) {
            $scope.sizeUpdate = function (tankSize) {
                $scope.addToListBut = 'btn-primary enabled';
                $scope.cost = 00;
                if (selected == 'Tank') {
                    $scope.cost = 100.00;
                } else if (selected == 'Install Portable Container') {
                    $scope.cost = 200.00;
                } else if (selected == 'Clean leftover Spills') {
                    $scope.cost = 300.00;
                } else {
                    $scope.addToListBut = 'btn-primary disabled';
                }

                $scope.addItem = function (JobsId) {
                    if (JobsId == 1) {
                        $scope.invoice.items1.push({ service: selected, size: tankSize, cost: $scope.cost });
                        console.log('Data ' + JobsId + ' number of items: ' + $scope.invoice.items1.length);
                        $scope.forBut(JobsId);
                        $scope.showModal(JobsId);
                        console.log($scope.invoice.items1);
                        if (selected == undefined) {
                            $scope.invoice.items1.splice($scope.invoice.items1.indexOf(JobsId), 1);
                        }
                    } else if (JobsId == 2) {
                        $scope.invoice.items2.push({ service: selected, size: tankSize, cost: $scope.cost });
                        console.log('Data ' + JobsId + ' number of items: ' + $scope.invoice.items2.length);
                        $scope.forBut(JobsId);
                        $scope.showModal(JobsId);
                        console.log($scope.invoice.items2);
                        if (selected == undefined) {
                            $scope.invoice.items2.splice($scope.invoice.items2.indexOf(JobsId), 1);
                        }
                    } else {
                        $scope.invoice.items3.push({ service: selected, size: tankSize, cost: $scope.cost });
                        console.log('Data ' + JobsId + ' number of items: ' + $scope.invoice.items3.length);
                        $scope.forBut(JobsId);
                        $scope.showModal(JobsId);
                        console.log($scope.invoice.items3);
                        if (selected == undefined) {
                            $scope.invoice.items3.splice($scope.invoice.items3.indexOf(JobsId), 1);
                        }
                    }

                    $scope.addToListBut = 'btn-primary disabled';
                    selected = undefined;
                    $scope.cost = 00;
                }
            }
            $scope.sizeUpdate();
        }
        $scope.serviceUpdate();

        $scope.forBut = function (JobsId) {
            if (JobsId == 1) {
                if ($scope.count1.length == $scope.invoice.items1.length) {
                    return 'btn-primary enabled';
                    alert(JobsId + ' is ready');
                } else {
                    return 'btn-default disabled';
                }
            } else if (JobsId == 2) {
                if ($scope.count2.length == $scope.invoice.items2.length) {
                    return 'btn-primary enabled';
                } else {
                    return 'btn-default disabled';
                }
            } else {
                if ($scope.count3.length == $scope.invoice.items3.length) {
                    return 'btn-primary enabled';
                } else {
                    return 'btn-default disabled';
                }
            }
        }

        //codes from UpdatedDenisFinal
        $scope.itemClicked = function (status, job) {
            if (status.isActive) {
                status.isActive = false;
            } else {
                angular.forEach(job.statuscollection, function (status) {
                    status.isActive = false;
                });
                status.isActive = true;
            }
        };

        $scope.isActive = false;
        $scope.activeButton = function () {
            $scope.isActive = !$scope.isActive;
        };

        $scope.resetbuttons = function () {
            $scope.completed1 = false;
            $scope.uncompleted1 = false;
            $scope.completed2 = false;
            $scope.uncompleted2 = false;
            $scope.completed3 = false;
            $scope.uncompleted3 = false;

        };
    }]);