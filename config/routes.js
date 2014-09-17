var facebook = require('../controllers/facebook');
var throttler = require('../helpers/throttler');

module.exports = function(app) {

	app.all('/api/campaigns*', throttler.limit);
	app.get('/api/campaigns', facebook.getCampaigns);
	app.post('/api/campaigns', facebook.postCampaign);
	app.put('/api/campaigns/:campaignID', facebook.updateCampaign);
	app.delete('/api/campaigns/:campaignID', facebook.deleteCampaign);

	app.use('/api/*', function (req, res) {
		res.status(404).send('Sorry, 404 Not Found');
	});
};