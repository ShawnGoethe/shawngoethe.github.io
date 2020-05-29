// require('shelljs/global');

// try {
// 	hexo.on('deployAfter', function() {//当deploy完成后执行备份
// 		run();
// 	});
// } catch (e) {
// 	console.log("You make a wrong：" + e.toString());
// }

// function run() {
// 	if (!which('git')) {
// 		echo('Sorry, this script requires git');
// 		exit(1);
// 	} else {
// 		echo("======================Auto Backup Begin===========================");
// 		cd('./');
// 		if (exec('git add --all').code !== 0) {
// 			echo('Error: Git add failed');
// 			exit(1);

// 		}
// 		if (exec('git commit -am "Form auto backup script\'s commit"').code !== 0) {
// 			echo('Error: Git commit failed');
// 			exit(1);

// 		}
// 		if (exec('git push origin source').code !== 0) {
// 			echo('Error: Git push failed');
// 			exit(1);

// 		}
// 		echo("==================Auto Backup Complete============================")
// 	}
// }
