import { Injectable } from '@angular/core';

@Injectable()
export class highlightKeyService {
	constructor(){

	}

	// height the search key word
	public dataPattern(pa,data):Array<any> {
		let newData: Array<any> = [];
		if(pa){			
			let Pattern = new RegExp(pa,"i");
			//for each contacts data to find which property has the search key
			// if the property has the search key which id show and the search key to bold and red.
			 data.map(item => {
			 	let newItem = { 
				 	ownDefine: { 
				 	  initName:'',
						value: '',
						state: false
					}
				}

			 	for(let key in item){		 		
			 		let value = item[key];	
			 		newItem[key] = value;		 		
			 		if(value && Pattern.exec(value)){
			 			let newKey = Pattern.exec(value);

			 			if(typeof value === 'number'){
			 				value = value.toString();
			 			}
			 			if( typeof value === 'string'){
			 				value = value.replace(newKey[0], `<span class="red bold">${newKey[0]}</span>`);
			 			}
			 			if(key.indexOf('Name') != -1){
			 				newItem[key] = value;
			 			}else{				 						 			
				 			newItem.ownDefine = {
				 			  initName: item.businessPartnerName1||item.projectName,
								value: value,
								state: true
							}
						}
			 		}
			 	}	
			 	newData.push(newItem);		            
			});

			return newData;
		}else{
            return data
		}
		
	}

}