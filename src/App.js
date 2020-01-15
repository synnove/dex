import React from 'react';
import './App.css';
import pokeData from './galar_dex.json';

class PokeCheckBox extends React.Component {
  render () {
    var checkbox;
    var checked = this.props.value;
    var type    = this.props.type;

    if (this.props.value) {
      checkbox = <input type="checkbox" disabled="disabled" checked="checked"/>;
    } else {
      checkbox = <input type="checkbox" disabled="disabled"/>;
    }
    
    return (
      <div className="poke_info">{ type }: { checkbox }</div>
    )
  }
}

class PokeID extends React.Component {
  render () {
    return <div className="pokemon_id">{ this.props.id }</div>
  }
}

class PokeIcon extends React.Component {
  render () {
    var type = this.props.type;
    var name = this.props.name;

    if (name) {
      if (type === "pokemon") {
        return (
          <div className="poke_icon">
              <img src={process.env.PUBLIC_URL + '/icons/' + name + '.png'} alt={ name }/>
          </div>
        )
      } else if (type === "pokeball") {
        return (
          <div className="poke_ball">
            <img src={process.env.PUBLIC_URL + '/icons/pokeballs/' + name.toLowerCase() + 'ball.png'} alt={ name }/>
          </div>
        )
      } else if (type === "gender") {
        return (
          <div className="poke_ball">
            <img src={process.env.PUBLIC_URL + '/icons/' + name.toLowerCase() + '.png'} alt={ name }/>
          </div>
        )
      }
    } else {
      return (<div className="poke_ball"></div>)
    }
  }
}

class PokeTypes extends React.Component {
  render () {
    var types = Array.from(this.props.types);
    return (
      <div className="poke_types">
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
  }
}

class PokeBall extends React.Component {
}

class PokeGeneric extends React.Component {
  render () {
    var data = this.props.data;
    return (
      <div className="poke_info"> { data } </div>
    )
  }
}

class Pokemon extends React.Component {
  render() {
    var id        = this.props.id;
    var padded_id = (Array(3).join('0') + id).slice(-3);
    var name      = pokeData[ padded_id ]["Name"];
    var types     = pokeData[ padded_id ]["Types"];
    var gender    = pokeData[ padded_id ]["Gender"];
    var nature    = pokeData[ padded_id ]["Nature"];
    var iv        = pokeData[ padded_id ]["IVs"];
    var dynamax   = pokeData[ padded_id ]["Dynamax"];
    var language  = pokeData[ padded_id ]["Region"];
    var ball      = pokeData[ padded_id ]["Ball"];
    var caught    = pokeData[ padded_id ]["Caught"];
    var owned     = pokeData[ padded_id ]["Owned"];
    return (
      <div className="pokemon">
        <PokeID       id={ padded_id }                                  />
        <PokeIcon     name={ id }     type="pokemon"                    />
        <PokeGeneric  data={ name }                                     />
        <PokeTypes    types={ types }                                   />
        <PokeCheckBox type="Caught"   value={ caught }                  />
        <PokeCheckBox type="Owned"    value={ owned }                   />
        <PokeIcon     name={ ball }   type="pokeball"                   />
        <PokeSelect   select="gender" data={ gender }                   />
        <PokeSelect   select="nature" data={ nature }                   />
        <PokeGeneric  data={ "IVs: " + iv + "/6" }                      />
        <PokeGeneric  data={ "Dynamax: " + dynamax + "/10" }      />
        <PokeSelect   select="region" data={ language }                 />
      </div>
    );
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
      <div className="box">
        { elements }
      </div>
    )
  }
}

class Pokedex extends React.Component {

  render() {
    return (
      <div className="page">
        <div className="header">
          <button className="region">Galar Basic</button>
          <button className="region">Isle of Whatever</button>
          <button className="region">Something Tundra</button>
        </div>
        <div className="pokedex">
          <Region region="galar"/>
        </div>
      </div>
    )
  }
}

export default Pokedex;
