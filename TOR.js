const shell = require('shelljs');
var TOR = function(){
	return {
		Refresh:function(){
			return shell.exec('sudo /etc/init.d/tor restart',{silent: true});
		},
		CurrentIP:function(){
			return shell.exec("torify curl -s checkip.amazonaws.com");
		}
	}
}();
module.exports = TOR;
