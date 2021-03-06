let neighbours =  {
  "alaska":["northwest_territory","alberta","kamchatka"],"northwest_territory":["alaska","alberta","ontario","greenland"],"greenland":["northwest_territory","ontario","eastern_canada","iceland"],"alberta":["alaska","northwest_territory","ontario","western_united_states"],"ontario":["northwest_territory","greenland","alberta","eastern_canada","western_united_states","eastern_united_states"],"eastern_canada":["greenland","ontario","eastern_united_states"],"western_united_states":["alberta","ontario","eastern_united_states","central_america"],"eastern_united_states":["ontario","eastern_canada","western_united_states","central_america"],"central_america":["western_united_states","eastern_united_states","venezuela"],"venezuela":["brazil","peru","central_america"],"peru":["brazil","argentina","venezuela"],"brazil":["argentina","peru","venezuela","north_africa"],"argentina":["brazil","peru"],"iceland":["greenland","scandinavia","great_britain"],"scandinavia":["iceland","great_britain","northern_europe","russia"],"great_britain":["iceland","scandinavia","northern_europe","western_europe"],"northern_europe":["scandinavia","great_britain","western_europe","southern_europe","russia"],"western_europe":["great_britain","northern_europe","southern_europe","north_africa"],"southern_europe":["northern_europe","western_europe","russia","north_africa","egypt","middle_east"],"russia":["scandinavia","northern_europe","southern_europe","ural","afghanistan","middle_east"],"north_africa":["brazil","western_europe","southern_europe","egypt","east_africa","central_africa"],"egypt":["southern_europe","north_africa","middle_east","east_africa"],"east_africa":["north_africa","egypt","middle_east","central_africa","south_africa","madagascar"],"central_africa":["north_africa","east_africa","south_africa"],"south_africa":["central_africa","east_africa","madagascar"],"madagascar":["east_africa","south_africa"],"ural":["russia","siberia","afghanistan","china"],"siberia":["ural","yakutsk","irkutsk","china","mongolia"],"yakutsk":["siberia","irkutsk","kamchatka"],"irkutsk":["siberia","yakutsk","kamchatka","mongolia"],"kamchatka":["alaska","yakutsk","irkutsk","mongolia","japan"],"afghanistan":["russia","ural","china","middle_east","india"],"china":["ural","siberia","afghanistan","mongolia","india","southeast_asia"],"mongolia":["siberia","irkutsk","kamchatka","china","japan"],"japan":["kamchatka","mongolia"],"middle_east":["southern_europe","russia","egypt","east_africa","afghanistan","india"],"india":["afghanistan","china","middle_east","southeast_asia"],"southeast_asia":["china","india","indonesia"],"indonesia":["southeast_asia","new_guinea","western_australia"],"new_guinea":["indonesia","western_australia","eastern_australia"],"western_australia":["indonesia","new_guinea","eastern_australia"],"eastern_australia":["new_guinea","western_australia"]
}

const validate = {
  isPlayersTurn: function(object) {
    if(object.state.activePlayer === object.state.currentPlayer) {
      return true
    } else {
      return false
    }
  },


  territoryClick: function(event, object) {
    let validClick = false
    object.state.territories.map(territory => {
      if(event.target.id === territory.name) {
        validClick = true
        return ''
      } else {
        return ''
      }
    })
    return validClick;
  },

  isTerritorySelected: function(object) {
    if (object.state.firstTerritory === "") {
      return false;
      } else {
        return true;
       }
  },

  areNeighbours: function(firstTerritoryObject, secondTerritoryObject) {
    let isTrue = false
    Object.entries(neighbours).map(territory => {
      if(territory[0] === firstTerritoryObject.name) {
        territory[1].map(neighbour => {
          if(neighbour === secondTerritoryObject.name) {
            isTrue = true
            return ''
          } else {
            return ''
          }
        })
      } return ''
      })
    return isTrue;
  },
  
  canPlayerSelectTerritory: function(event, object) {
    let canSelect = false
    let territorySelected = event.target.id
    object.state.territories.map(territory => {
      if(territory.name === territorySelected) {
        if(territory.player === object.state.activePlayer) {
          canSelect = true
          return ''
        } else {
          return ''
        }
      } else {
        return ''
      }
    })
    return canSelect;
  },
    
  selectTerritory: function(event) {
    event.target.classList.toggle("selected")
  },

  deselectAllTerritories: function(object) {
    object.state.territories.map(territory => {
      document.getElementById(`${territory.name}`).classList.remove('selected')
    })

  },


  thisTerritoryAlreadySelected: function(event, object) {
    if (object.state.firstTerritory === event.target.id) {
      return true;
      } else {
        return false; 
      }
  },

  humanize: function(str) {
    var i, frags = str.split('_');
    for (i=0; i<frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
  },

  differentTerritoryAlreadySelected: function(event, object) {
    let newTerritoryObject = event.target.id
    let oldTerritoryObject = object.state.firstTerritory //this.state.firstTerritory
    object.state.territories.map(territory => {
      if(event.target.id === territory.name) {
        newTerritoryObject = territory
        return ''
      } else if (object.state.firstTerritory === territory.name) {
        oldTerritoryObject = territory
        return ''
      } else {
        return ''
      }
    })
    if(oldTerritoryObject.player === newTerritoryObject.player) {
      return true;
    } else {
      return false;
    }
  },

  deselectSameTerritory: function(event) {
    event.target.classList.toggle("selected");
  },

  deselectOldTerritory: function(object) {
    document.getElementById(`${object.state.firstTerritory}`).classList.toggle('selected')
  },

  findFirstSelectedObject: function(territories, firstTerritory) {
    let firstTerritoryObject = "first territory not found"
    territories.map(territory => {
      if(firstTerritory === territory.name) {
        firstTerritoryObject = territory
        return ''
        } else {
          return ''
        }
      })
    return firstTerritoryObject;
  },

  findSecondSelectedObject: function(event, territories) {
    let secondTerritoryObject = "second territory not found";
        territories.map(territory => {
          if(event.target.id === territory.name) {
            secondTerritoryObject = territory
            return ''
          } else {
            return ''
          }
    })
    return secondTerritoryObject;
  },

  isEnemyTerritory: function (attacking, defending) {
    if(attacking.player === defending.player) {
      return false
    } else {
      return true
    }
  },
  
}

export default validate