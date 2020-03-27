const update = {
  colorTerritories: function (state) {
    state.territories.map(territory => {
      document.getElementById(`${territory.name}`).classList.remove('blue')
      document.getElementById(`${territory.name}`).classList.remove('green')
      document.getElementById(`${territory.name}`).classList.remove('yellow')
      document.getElementById(`${territory.name}`).classList.remove('purple')
      document.getElementById(`${territory.name}`).classList.remove('brown')
      document.getElementById(`${territory.name}`).classList.remove('red')
      document.getElementById(`${territory.name}`).classList.add(`${territory.player}`)
      return ''
    })
  },

  addNumberOfUnits: function (state) {
    state.territories.map(territory => {
      document.getElementById(`${territory.name}-units-text`).textContent = `${territory.units}`
    })
  },


  getStateOfGame: function (object) {
    fetch(`../${object.state.game_id}`)
      .then(promise => promise.json())
      .then(data => {
        console.log(data)
        object.setState({ 
          territories: data.territories,
          turns: data.players,
          activePlayer: data.players[data.turn],
          phase: data.phase,
          unitsToDeploy: data.unitsToDeploy,
          cards: data.cards
        })
        update.colorTerritories(object.state)
        update.addNumberOfUnits(object.state)
      })
  },

  sendOccupyToServer: function (object, territory) {
    let toSend = {
      territory: territory
    }

    fetch(`../occupy/${object.state.game_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(toSend)
      }
    )
      .then(response => response.json())// parses response as JSON
      .then(data => {
        object.setState({
          turns: data.players,
          turnIndex: data.turn,
          activePlayer: data.players[data.turn],
          territories: data.territories,
          phase: data.phase,
          unitsToDistribute: data.unitsToDistribute,
          occupyMove: true
        })
        update.addNumberOfUnits(object.state)
        update.colorTerritories(object.state)
      });
  },


  sendAttackToServer: function (attacking, defending, object) {
    let toSend = {
      attackingTerritory: attacking,
      defendingTerritory: defending,
      blitz: object.state.blitz
    }
    console.log(toSend)
    fetch(`../attack/${object.state.game_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(toSend)
      }
    )
      .then(response => response.json())// parses response as JSON
      .then(data => {
        object.setState({ attackerDice: data.attackerDice })
        object.setState({ defenderDice: data.defenderDice })
        object.setState({ territories: data.territories })
        update.colorTerritories(object.state)
        update.addNumberOfUnits(object.state)
      });
  },

  sendDeployToServer: function (object) {
    let toSend = {
      territories: object.state.territories
    }
    console.log(toSend)
    fetch(`../deploy/${object.state.game_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(toSend)
      }
    )
      .then(response => response.json())// parses response as JSON
      .then(data => {
        object.setState({ phase: data.phase })
      });
  },

  sendFortifyToServer: function (object, fortified=true) {
    let toSend = {
      fromTerritory: object.state.firstTerritory,
      fromUnits: object.state.fromFortifyUnits,
      toTerritory: object.state.secondTerritory,
      toUnits: object.state.toFortifyUnits
    }

    if(fortified === false) {
      toSend = {
        fromTerritory: null,
        toTerritory: null,
        fromUnits: 0,
        toUnits: 0
      }
    }

    fetch(`../fortify/${object.state.game_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(toSend)
      }
    )
      .then(response => response.json())// parses response as JSON
      .then(data => {
        console.log(data)
        object.setState(
          {
            turn: data.turn,
            phase: data.phase,
            turns: data.players,
            territories: data.territories,
            attackerDice: data.attackerDice,
            defenderDice: data.defenderDice,
            unitsToDeploy: data.unitsToDeploy,
            activePlayer: data.players[data.turn]
          }
        )
      });
  },

}

export default update