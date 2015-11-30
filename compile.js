'use strict';

const fs = require('fs');
const url = require('url');
const utils = require('./js/utils');

const readFile = utils.fs(fs.readFile, fs);

const indexUrl = './html/index.html';
const tplUrl = './templates/index.tpl';
const encoding = {encoding: 'utf-8'};
const interpolate = utils.interpolate;

/* 
	When I wander at the city in the morning mist
	Sielent hums tell me secrets of the night
	Gently whisper to me how bigger it becomes
	And how smaller do I

	I raise my face to the rude snow and see
	How the roofs reaching up the sky
	And I close my eyes, and I close my eyes
	Picking up snowfalakes with my empty face
	With my empty eyes

	How small you should be to slip
	In the caves of raising up the walls
	How big you should be to withstand
	All the winds of the roads
	

	Don't you hear how buildings growl in the night
	And tired roads roars after midnight

*/


let tree = readFile(indexUrl, encoding).map(parse).map(utils.toObject)
let template = readFile(tplUrl, encoding);
let context = tree.sync(template).map(compile).watch();


function nonEmpty(f) {
	return f !== '' && f !== ' ';
}

function parse (html) {
	const allRegex = /<!--\.[\s\S]*?\:\:-->/g;
	const bodyRegex = /::([\s\S]*?)::/g;

	let entities = [];
	
	html.match(allRegex).forEach((match, index) => {
		
		if (~match.indexOf('Component')) {
			match.replace(bodyRegex, (body, group) => {
				let data = group.trim().split(':').filter(nonEmpty).join('\n').split('\n');
				let about = {
					type: 'component'
				};

				for(let i = 0; i < data.length; i+=2) {
					let prop = data[i];
					let value = data[i+1];

					if (~prop.indexOf('name')) {
						about.name = value.trim()
					}

					if (~prop.indexOf('file')) {
						about.file = value.trim()
					}
				}

				entities.push(about);
			})
		}

		if (~match.indexOf('Compound')) {
			let about = {};

			match.replace(bodyRegex, (body, group) => {
				let g = '({' + group +'})';

				g = g.replace(/name:([\s\S]*?),?\n/, (body, name) => {
					return 'name:' + "'" + name+ "',";
				}).replace(/src:([\s\S]*?),?\n/, (body, name) => {
					return 'src:' + "'" + name+ "',";
				}).replace(/parent:([\s\S]*?),?\n/, (body, name) => {
					return 'parent:' + "'" + name+ "',";
				}).replace(/group:([\s\S]*?),?\n/, (body, name) => {
					return 'group:' + "'" + name+ "',";
				})


				try{
					about = eval(g);
				}catch(err){
					console.log('error')
					console.log(g)
				}
			});

			about.type = 'compound';

			entities.push(about);
		}
	});

	return entities;
}

function sort(arr) {
	let t = {};

	let components = arr.filter(utils.filterBy('type', 'component'));
	let compounds = arr.filter(utils.filterBy('type', 'compound'));

	function sortChildren(children, parentName){
		if (Array.isArray(children)) {
			children.forEach(function(child) { 
				if (typeof child == 'string') {
					if (t[child]) {
						t[child].parent = comp.name;
					}
				} else {
					sortChildren(child.name);
				}
			});

		} else {
			children.elems = children.elems.map(function(elem){
				return parentName + '__' + elem;
			});
			sortChildren(children.elems, parentName);
		}
	}

	/* HERE */
	compounds.forEach(function(comp){
		let children = comp.components; //console.log(comp); //.components
		t[comp.name] = comp;
		sortChildren(comp.components, comp.name);
	});

}

function compile(data){
	let components = data[0];
	let tpl = data[1];

	let res = {};
	for(let cname in components){
		res[cname.trim()] = function(name){
			console.log('Intpl: ', name);
			if (components[name].type == 'compound') {
				return 'ALLAHU AKBAR';
			} else {
				return readFile(components[name].file, encoding);
			}
		}
	}
	debugger;
	let d = interpolate(tpl, res);
	return d;
}

module.exports = context;
