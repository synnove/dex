import React from 'react';
import './App.css';
import pokeData from './galar_dex.json';

class PokeCheckBox extends React.Component {
  render () {
    var checkbox;
    var checked = this.props.value;
    var type    = this.props.type;

    if (checked) {
      checkbox = <input type="checkbox" className="nes-checkbox" disabled="disabled" checked="checked"/>;
    } else {
      checkbox = <input type="checkbox" className="nes-checkbox" disabled="disabled"/>;
    }
    
    return (
      <div className="col-xs poke_info"><label>{ checkbox }<span>{ type }</span></label></div>
    )
  }
}

class PokeID extends React.Component {
  render () {
    return <div className="col-xs pokemon_id">{ this.props.id }</div>
  }
}

class PokeIcon extends React.Component {
  render () {
    var type = this.props.type;
    var name = this.props.name;

    if (name) {
      if (type === "pokemon") {
        return (
          <div className="col-xs poke_icon">
              <img src={process.env.PUBLIC_URL + '/icons/pokemon/' + name + '.png'} alt={ name }/>
          </div>
        )
      } else if (type === "pokeball") {
        return (
          <div className="col-xs poke_ball">
            <img src={process.env.PUBLIC_URL + '/icons/pokeballs/' + name.toLowerCase() + 'ball.png'} alt={ name }/>
          </div>
        )
      }
    } else {
      return (<div className="col-xs"></div>)
    }
  }
}

class PokeTypes extends React.Component {
  render () {
    var types = Array.from(this.props.types);
    return (
      <div className="col-xs-2 poke_types">
        { types.map((type) => (
          <img src={process.env.PUBLIC_URL + '/icons/types/' + type.toLowerCase() + '.gif'} alt={ type }/>
        ))}
      </div>
    );
  }
}

class PokeSelect extends React.Component {
  render () {
    var data     = this.props.data;
    {/*
    var select   = this.props.select;
    var natures  = ["Adamant", "Bashful", "Bold", "Brave", "Calm", "Careful", "Docile", "Gentle", "Hardy", "Hasty", "Impish", "Jolly", "Lax", 
                    "Lonely", "Mild", "Modest", "Naive", "Naughty", "Quiet", "Quirky", "Rash", "Relaxed", "Sassy", "Serious", "Timid", "None"]
    var regions  = ["ENG", "CHS", "CHT", "SPA", "ITA", "GER", "FRE", "KOR", "None"]
    var genders  = ["M", "F", "N/A"]
    var category = []
    var elements = []

    if (select === "nature") { 
      category = natures;
    } else if (select === "gender") {
      category = genders;
    } else if (select === "region") {
      category = regions;
    }

    category.forEach( function (option) {
      if (option === data) { 
        elements.push(<option key={ option } selected="selected">{ option }</option>)
      } else { 
        elements.push(<option key={ option }>{ option }</option>) 
      }
    });
   
    return ( 
      <select disabled="disabled">
        { elements }
      </select> 
    )
    */}
    return (
      <div className="col-xs poke_info">{ data }</div>
    )
  }
}

class PokeGeneric extends React.Component {
  render () {
    var data = this.props.data;
    return (
      <div className="col-xs poke_info"> { data } </div>
    )
  }
}

class Pokemon extends React.Component {
  render() {
    var id        = this.props.id;
    var padded_id = (Array(3).join('0') + id).slice(-3);
    var name      = pokeData[ padded_id ]["Name"];
    var types     = pokeData[ padded_id ]["Types"];
    var caught    = pokeData[ padded_id ]["Caught"];
    var owned     = pokeData[ padded_id ]["Owned"];
    return (
      <div className="row nes-container is-rounded pokedex">
        <div className="col-xs-12"><div className="row pokemon">
          <PokeID       id={ padded_id }                 />
          <PokeIcon     name={ id }     type="pokemon"   />
          <PokeGeneric  data={ name }                    />
          <PokeTypes    types={ types }                  />
          <PokeCheckBox type="Caught"   value={ caught } />
          <PokeCheckBox type="Owned"    value={ owned }  />
        </div></div>
        <PokeStats id={ padded_id }/>
      </div>
    )
  }
}

class PokeStats extends React.Component {
  render () {
    var id       = this.props.id;
    var owned    = pokeData[ id ]["Owned"];
    var ball     = pokeData[ id ]["Ball"];
    var nature   = pokeData[ id ]["Nature"];
    var iv       = pokeData[ id ]["IVs"];
    var dynamax  = pokeData[ id ]["Dynamax"];
    var language = pokeData[ id ]["Region"];
    if (owned) {
      return (
        <div className="col-xs-12"><div className="row pokemon">
          <PokeIcon     name={ ball }   type="pokeball"            />
          <PokeSelect   select="nature" data={ nature }            />
          <PokeGeneric  data={ "IVs: " + iv + "/6" }               />
          <PokeGeneric  data={ "G | Dynamax: " + dynamax + "/10" } />
          <PokeGeneric  data={ "HA: Y/N" }                         />
          <PokeSelect   select="region" data={ language }          />
        </div></div>
      )
    }
    return (
      <div className="col-xs-12"><div className="row pokemon">
      </div></div>
    )
  }
}

class Region extends React.Component {
  render() {
    var region_ranges = {galar: [1,400], isle: [401,600], tundra: [601,800]};
    var elements = [];
    var start = region_ranges[this.props.region][0];
    var end   = region_ranges[this.props.region][1];
    console.log({ pokeData });
    for (var i=start; i<end+1; i++) {
      elements.push(<Pokemon id={i}/>); 
    }

    return (
      <div className="col-xs-12">
        { elements }
      </div>
    )
  }
}

class Trainer extends React.Component {
  render () {
    var name = "Reine";
    return (
      <div id="trainer" className="container">
        <div className="row nes-container with-title is-rounded">
          <p className="title">{ name }</p>
          <div className="col-xs-12"><div className="row">
            <div className="col-xs-2 trainer">
              <img src={process.env.PUBLIC_URL + '/icons/trainers/' + name + '.png'} alt={ name }/>
            </div>
            <div className="col-xs-10">
              <div className="row">
                <div className="col-xs nes-container is-rounded">nothing actually works yet</div>
                <div className="col-xs nes-container is-rounded">badges: 8</div>
                <div className="col-xs nes-container is-rounded">pokemon caught: 400</div>
              </div>
              <Party/>
            </div>
          </div></div>
        </div>
      </div>
    )
  }
}

class Party extends React.Component {
  render () {
    var party = [9, 69, 209, 219, 81, 311];

    return (
      <div className="row">
        { party.map((id) => (
          <div className="col-xs nes-container is-rounded pokemon"><img src={process.env.PUBLIC_URL + '/icons/pokemon/' + id + '.png'}/></div>
        ))}
      </div>
    );
  }
}

class Pokedex extends React.Component {

  render() {
    return (
      <div className="page">
        <div className="row center-xs header">
          <button className="nes-btn is-primary">Galar (1-400)</button>
          <button className="nes-btn is-disabled">Isle of Armor (???)</button>
          <button className="nes-btn is-disabled">Crown Tundra (???)</button>
        </div>
        <Trainer/>
        <div id="pokedex" className="container">
          <div className="row nes-container with-title is-rounded">
            <p className="title">Pokedex</p>
            <Region region="galar"/>
          </div>
        </div>
      </div>
    )
  }
}

export default Pokedex;
