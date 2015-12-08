describe('index', function() {
    var datagrep = require('../../index'),
        numbers = require('numbers'),
        Decimal = require('decimal.js'),
        utils = require('./utils');

    // describe('the linearRegression method', function() {
    //     it('is defined', function() {
    //         expect(linearRegression).toBeDefined();
    //     });

    //     it('returns a Promise', function() {
    //         expect(linearRegression()).toBeInstanceOf(Promise);
    //     });

    //     it('returns an error if options is not provided', function(done) {
    //         linearRegression().catch(function(message) {
    //             expect(message).toBe("options is required");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.x is not provided', function(done) {
    //         linearRegression({}).catch(function(message) {
    //             expect(message).toBe("x is required");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.x is not an Array', function(done) {
    //         linearRegression({
    //             x: 'not an Array'
    //         }).catch(function(message) {
    //             expect(message).toBe("x must be an Array");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.y is not provided', function(done) {
    //         linearRegression({
    //             x: []
    //         }).catch(function(message) {
    //             expect(message).toBe("y is required");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.y is not an Array', function(done) {
    //         linearRegression({
    //             x: [],
    //             y: 'not an Array'
    //         }).catch(function(message) {
    //             expect(message).toBe("y must be an Array");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.alpha is not provided', function(done) {
    //         linearRegression({
    //             x: [],
    //             y: []
    //         }).catch(function(message) {
    //             expect(message).toBe("alpha is required");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.alpha is not a number', function(done) {
    //         linearRegression({
    //             x: [],
    //             y: [],
    //             alpha: 'alpha is not a number'
    //         }).catch(function(message) {
    //             expect(message).toBe("alpha must be a number");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.iterations is required', function(done) {
    //         linearRegression({
    //             x: [],
    //             y: [],
    //             alpha: 0.001
    //         }).catch(function(message) {
    //             expect(message).toBe("iterations is required");
    //             done();
    //         });
    //     });

    //     it('returns an error if options.iterations is not an integer', function(done) {
    //         linearRegression({
    //             x: [],
    //             y: [],
    //             alpha: 0.001,
    //             iterations: 0.001
    //         }).catch(function(message) {
    //             expect(message).toBe("iterations must be an integer");
    //             done();
    //         });
    //     });

    //     it('determines the right theta for the data set', function(done) {
    //         var data = require('./data.json'),
    //             theta0,
    //             theta1;
    //         linearRegression(data).then(function(theta) {
    //             expect(theta[0][0]).toBe(theta0);
    //             expect(theta[1][0]).toBe(theta1);
    //             done();
    //         });
    //     });

    // });

    var sales,
        train_data,
        test_data,
        input_feature,
        output,
        squarefeet_slope,
        squarefeet_intercept,
        bedroom_slope,
        bedroom_intercept;

    describe('setup', function() {
        it('sets sales data', function(done) {
            utils.readCsvFile('/Philadelphia_Crime_Rate_noNA.csv')
                .then(function(data) {
                    expect(data[0].join(' ')).toBe([
                        'HousePrice',
                        'HsPrc ($10,000)',
                        'CrimeRate',
                        'MilesPhila',
                        'PopChg',
                        'Name',
                        'County'
                    ].join(' '));
                    sales = data;
                    done();
                });
        });

        it('sets train_data', function(done) {
            utils.readCsvFile('/kc_house_train_data.csv')
                .then(function(data) {
                    expect(data[0].join(' ')).toBe([
                        'id',
                        'date',
                        'price',
                        'bedrooms',
                        'bathrooms',
                        'sqft_living',
                        'sqft_lot',
                        'floors',
                        'waterfront',
                        'view',
                        'condition',
                        'grade',
                        'sqft_above',
                        'sqft_basement',
                        'yr_built',
                        'yr_renovated',
                        'zipcode',
                        'lat',
                        'long',
                        'sqft_living15',
                        'sqft_lot15'
                    ].join(' '));
                    train_data = data;
                    done();
                });
        });

        it('sets test_data', function(done) {
            utils.readCsvFile('/kc_house_test_data.csv')
                .then(function(data) {
                    expect(data[0].join(' ')).toBe([
                        'id',
                        'date',
                        'price',
                        'bedrooms',
                        'bathrooms',
                        'sqft_living',
                        'sqft_lot',
                        'floors',
                        'waterfront',
                        'view',
                        'condition',
                        'grade',
                        'sqft_above',
                        'sqft_basement',
                        'yr_built',
                        'yr_renovated',
                        'zipcode',
                        'lat',
                        'long',
                        'sqft_living15',
                        'sqft_lot15'
                    ].join(' '));
                    test_data = data;
                    done();
                });
        });
    });

    describe('simple_linear_regression', function() {
        it('estimates the slope and intercept for crimerate', function() {
            input_feature = utils.getCol(sales, 2);
            output = utils.getCol(sales, 0);

            var response = datagrep.simple_linear_regression(input_feature, output);
            expect(response.slope.toFixed(2)).toBe('-576.91');
            expect(response.intercept.toFixed(2)).toBe('176629.41');
        });

        it('estimates the slope and intercept for squarefeet', function() {
            input_feature = utils.getCol(train_data, 5);
            output = utils.getCol(train_data, 2);

            var response = datagrep.simple_linear_regression(input_feature, output);
            squarefeet_slope = response.slope;
            squarefeet_intercept = response.intercept;
            expect(squarefeet_slope.toFixed(2)).toBe('281.96');
            expect(squarefeet_intercept.toFixed(2)).toBe('-47116.08');
        });

        it('estimates the slope and intercept for bedrooms', function() {
            input_feature = utils.getCol(train_data, 3);

            var response = datagrep.simple_linear_regression(input_feature, output);
            bedroom_slope = response.slope;
            bedroom_intercept = response.intercept;
            expect(bedroom_slope.toFixed(2)).toBe('127588.95');
            expect(bedroom_intercept.toFixed(2)).toBe('109473.18');
        });
    });

    describe('get_regression_predictions', function() {
        it('predicts the price for a house with 2650 sqft', function() {
            var predicted_output = datagrep.get_regression_predictions([2650], squarefeet_intercept, squarefeet_slope);
            expect(predicted_output[0].toFixed(2)).toBe('700075.27');
        });

        it('predicts the price for a house with 2640 sqft provided slope and intercept', function() {
            var predicted_output = datagrep.get_regression_predictions([2640], -44850, 280.76);
            expect(predicted_output[0].toFixed(2)).toBe('696356.40');
        });
    });

    describe('get_residual_sum_of_squares', function() {
        it('it determines the RSS for the simple linear regression for squarefeet on TRAINING data', function() {
            input_feature = utils.getCol(train_data, 5);
            output = utils.getCol(train_data, 2);

            var response = datagrep.simple_linear_regression(input_feature, output);
            squarefeet_slope = response.slope;
            squarefeet_intercept = response.intercept;

            var RSS = datagrep.get_residual_sum_of_squares(input_feature, output, squarefeet_intercept, squarefeet_slope);
            expect(RSS.toFixed(2)).toBe('1201918354179598.00');
        });

        it('it determines the RSS for the simple linear regression for squarefeet on TEST data', function() {
            input_feature = utils.getCol(test_data, 5);
            output = utils.getCol(test_data, 2);

            var response = datagrep.simple_linear_regression(input_feature, output),
                RSS = datagrep.get_residual_sum_of_squares(input_feature, output, response.intercept, response.slope);
            expect(RSS.toFixed(2)).toBe('275168573902787.31');
        });

        it('it determines the RSS for the simple linear regression for bedrooms on TEST data', function() {
            input_feature = utils.getCol(test_data, 3);
            output = utils.getCol(test_data, 2);

            var response = datagrep.simple_linear_regression(input_feature, output),
                RSS = datagrep.get_residual_sum_of_squares(input_feature, output, response.intercept, response.slope);
            expect(RSS.toFixed(2)).toBe('490597142829587.48');
        });
    });

    describe('inverse_regression_predictions', function() {
        it('it estimates square-feet for a house costing $800,000', function() {
            var estimated_input = datagrep.inverse_regression_predictions([800000], squarefeet_intercept, squarefeet_slope);
            expect(estimated_input[0].toFixed(2)).toBe('3004.39');
        });

        it('it estimates square-feet for a house costing $859,000 provided the slope and intercept', function() {
            var estimated_input = datagrep.inverse_regression_predictions([859000], -44850, 280.76);
            expect(estimated_input[0].toFixed(2)).toBe('3219.30');
        });
    });

});
