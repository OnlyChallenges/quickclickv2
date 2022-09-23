let Autoclickers = {
    Cps: 0,
    Cpots: 0,
    OldButtons: '',
    Mspc: 0,  //Milliseconds per click
    nbrOwned: {'clickers': {cost:50, number: 0, cps: 1, buttonString: 'Clicker', showing: false, state: ''},
               'trainedclickers': {cost:200, number:0, cps:5, buttonString: 'Trained Clicker', showing: false, state: ''},
               'spammers': {cost:1000, number:0, cps:30, buttonString: 'Spammer', showing: false, state: ''},
	       'tappers': {cost:20000, number:0, cps:100, buttonString: 'Tapper', showing: false, state: ''},
               'vibrationengineers': {cost: 100000, number:0, cps:500, buttonString: 'Vibration Engineer', showing: false, state: ''},
               'collegedropouts': {cost:1500000, number:0, cps:15000, buttonString: 'College Dropout', showing: false, state: ''},
	       'babies': {cost:20000000, number:0, cps:300000, buttonString: 'Baby', showing: false, state: ''},
	       'bossbabies': {cost:30000000, number:0, cps:2000000, buttonString: 'Boss Baby', showing: false, state: ''},
	       'unemployedengineers': {cost:500000000, number:0, cps:40000000, buttonString: 'Unemployed Engineer', showing: false, state: ''},
	       'testers': {cost:10000000000, number:0, cps:2000000000, buttonString: 'Tester', showing: false, state: ''},
	       'developers': {cost:3000000000000, number:0, cps:10000000000000, buttonString: 'Developer', showing: false, state: ''},},
    
    onload(){
      if (Load.found == true){
        for (const [key, value] of Object.entries(this.nbrOwned)){
          if (String(key) in Load.data.autoclickersdata){
	          this.nbrOwned[String(key)].number = Load.data.autoclickersdata[String(key)].number
            this.nbrOwned[String(key)].showing = Load.data.autoclickersdata[String(key)].showing
	        } else {
            this.nbrOwned[String(key)].number = 0
            this.nbrOwned[String(key)].showing = false       
	        }
        }
      
	    } else {
	      for (const [key, value] of Object.entries(this.nbrOwned)){
	        this.nbrOwned[String(key)].number = 0
	        this.nbrOwned[String(key)].showing = false
        }
      }
      this.updateClicksPerSec()
      this.updateClicksPerOneTenthSec()
    },
    
    addAutoClicker(id){
        if (Clicks.nbrOwned >= this.nbrOwned[id].cost){
            this.nbrOwned[id].number += 1
            Clicks.nbrOwned -= this.nbrOwned[id].cost
            this.updateClicksPerSec()
            this.updateClicksPerOneTenthSec()
            main.update()
        }
    },
    
    
    updateClicksPerSec(){
    	this.Cps = 0
    	for (const [key, value] of Object.entries(this.nbrOwned)){
    	  this.Cps += (value.cps*value.number)
    	}
    	document.getElementById('cps').innerHTML = String(this.Cps) + ' cps'
    },
    
    updateClicksPerOneTenthSec(){
        this.Cpots = 0
        if (this.Cps > 9){
          for (const [key, value] of Object.entries(this.nbrOwned)){
    	    this.Cpots += (Math.floor((value.cps*value.number)/10))
    	  }
    	}
    },
    
    updateButtons(){
      textstring=``
      for (const [key,value] of Object.entries(this.nbrOwned)){
        if (Clicks.nbrOwned >= value.cost){
          this.nbrOwned[String(key)].showing = true
          this.nbrOwned[String(key)].state = ''
        } else {
          this.nbrOwned[String(key)].state = 'disabled'
        }
      }
      for (const [key,value] of Object.entries(this.nbrOwned)){
        if (value.showing == true){
          textstring += `<button style='font-family:monospace; margin:1px 0' onclick="Autoclickers.addAutoClicker('`+String(key)+`')" `+value.state+`>` + 'Buy '+value.buttonString + ' (' + value.cost + 'C)' + `</button>`
          textstring += `\n\
`
        } else {
          textstring += ''
        }
      }
      
      //Allows clicking of button
      if (textstring != this.OldButtons){
        document.getElementById('test').innerHTML=textstring
        this.OldButtons = textstring
      }
    }   
}
    }   
}
