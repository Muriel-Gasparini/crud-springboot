import React, { Component } from 'react'
import Axios from 'axios'
import PubSub from 'pubsub-js'

import {
  Button,
  Form,
  Label,
  Input,
  FormGroup
} from 'reactstrap'

class FormPerson extends Component {

  state = {
    model: {
      id: 0,
      name: '',
      cpf: '',
      address: {
        street: '',
        state: '',
        city: '',
        country: ''
      },
      birthDate: '',
      age: ''
    }
  }

  setValues = (e, field) => {
    let { model } = this.state
    console.log(model)
    let address = ['street', 'state', 'city', 'country']
    address.forEach(data => {
      if (field === data) {
        this.state.model.address[field] = e.target.value
        this.setState({ model })
      } else {
        model[field] = e.target.value
        this.setState({ model })
      }
    })

  }

  create = () => {
    this.props.personCreate(this.state.model)
  }

  componentDidMount() {
    PubSub.subscribe('edit-person', (topic, person) => {
      this.setState({ model: person })
    })
  }

  render() {
    return (
      <Form>
        <div className="container-fluid">

          <div className="row">

            <div className="col">
              <FormGroup>
                <Label for="id">Identificador</Label>
                <Input id="id" name="id" placeholder="Precisa ser um número" value={this.state.model.id}
                  onChange={e => this.setValues(e, 'id')} />
              </FormGroup>
              <FormGroup>
                <Label for="name">Nome</Label>
                <Input id="name" name="name" value={this.state.model.name}
                  onChange={e => this.setValues(e, 'name')} />
              </FormGroup>
              <FormGroup>
                <Label for="cpf">CPF</Label>
                <Input id="cpf" name="cpf" value={this.state.model.cpf}
                  onChange={e => this.setValues(e, 'cpf')} />
              </FormGroup>

              <FormGroup>
                <Label for="birthDate">Data de nascimento</Label>
                <Input id="birthDate" name="birthDate" value={this.state.model.birthDate}
                  onChange={e => this.setValues(e, 'birthDate')} />
              </FormGroup>
              <FormGroup>
                <Label for="age">Idade</Label>
                <Input id="age" name="age" value={this.state.model.age}
                  onChange={e => this.setValues(e, 'age')} />
              </FormGroup>
            </div>

            <div className="col">
              <Label for="address">Endereço</Label>
              <FormGroup>
                <Label for="country">País</Label>
                <Input id="country" name="country"
                  onChange={e => this.setValues(e, 'country')} value={this.state.model.address.country} />
              </FormGroup>

              <FormGroup>
                <Label for="state">Estado</Label>
                <Input id="state" name="state"
                  onChange={e => this.setValues(e, 'state')} value={this.state.model.address.state} />
              </FormGroup>

              <FormGroup>
                <Label for="city">Cidade</Label>
                <Input id="city" name="city"
                  onChange={e => this.setValues(e, 'city')} value={this.state.model.address.city} />
              </FormGroup>

              <FormGroup>
                <Label for="street">Rua</Label>
                <Input id="street" name="street"
                  onChange={e => this.setValues(e, 'street')} value={this.state.model.address.street} />
              </FormGroup>
            </div>
            <Button color="success" block onClick={this.create}>Criar/Editar</Button>
          </div>
        </div>
      </Form>
    )
  }
}

class ListPerson extends Component {

  delete = (id) => {
    this.props.deletePerson(id)
  }

  onEdit = (person) => {
    PubSub.publish('edit-person', person)
  }

  render() {
    const { persons } = this.props

    return (

      <div className="container-fluid d-flex justify-content-around flex-wrap">
        {
          persons.map(person => (
            <div className="mb-3 text-center align-self-center align-items-center" style={{ boxShadow: ('0 1px 3px rgba(0,0,0,0.12)', '0 1px 2px rgba(0,0,0,0.24)'), width: '30vw' }} key={person.id}>
              <ul className="list-group">
                <li className="text-center list-group-item active d-flex justify-content-between align-items-center">
                  <h6>ID: {person.id}</h6>
                  <div>
                    <Button className="btn-info mr-2" onClick={e => this.onEdit(person)}>Editar</Button>
                    <Button className="btn-danger" onClick={e => this.delete(person.id)}>Apagar</Button>
                  </div>
                </li>
                <li className="d-flex text-center justify-content-between list-group-item">
                  <strong>Nome:</strong>
                  <p>{person.name}</p>
                </li>
                <li className="d-flex text-center justify-content-between list-group-item">
                  <strong>CPF:</strong>
                  <p>{person.cpf}</p>
                </li>
                <li className="d-flex text-center justify-content-between list-group-item">
                  <strong>Data de nascimento:</strong>
                  <p>{person.birthDate}</p>
                </li>
                <li className="d-flex text-center justify-content-between list-group-item">
                  <strong>Idade:</strong>
                  <p>{person.age}</p>
                </li>
                <li className="list-group-item">
                  <div className="list-group d-flex text-center justify-content-between">
                    <strong>Endereço:</strong>
                    <div href="#" className="list-group-item list-group-item-action list-group-item-dark d-flex text-center justify-content-between">
                      <strong>Cidade:</strong>
                      <p>{person.address.city}</p>
                    </div>
                    <div href="#" className="list-group-item list-group-item-action list-group-item-dark d-flex text-center justify-content-between">
                      <strong>Rua:</strong>
                      <p>{person.address.street}</p>
                    </div>
                    <div href="#" className="list-group-item list-group-item-action list-group-item-dark d-flex text-center justify-content-between">
                      <strong>Estado:</strong>
                      <p>{person.address.state}</p>
                    </div>
                    <div href="#" className="list-group-item list-group-item-action list-group-item-dark d-flex text-center justify-content-between">
                      <strong>País:</strong>
                      <p>{person.address.country}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))
        }
      </div>

    )
  }
}

export default class PersonsBox extends Component {

  constructor(props) {
    super(props)
    this.state = {
      persons: []
    }
  }

  url = 'https://api-spring-users.herokuapp.com/v1/user'

  async componentDidMount() {
    const response = await Axios.get(this.url)
    console.log(response.data)

    this.setState({ persons: response.data })
  }

  create = async (person) => {
    const body = {
      id: parseInt(person.id),
      name: person.name,
      cpf: person.cpf,
      address: {
        street: person.address.street,
        state: person.address.state,
        city: person.address.city,
        country: person.address.country
      },
      birthDate: person.birthDate,
      age: person.age
    }
    const personExists = await Axios.get(this.url)
    const editUser = personExists.data.filter(data => {
      return data.id === body.id
    })
    let response
    if (editUser[0]) {
      await Axios.put(`${this.url}/${body.id}`, body)
      response = await Axios.get(this.url)
      this.setState({ persons: response.data })
      return
    } else {
      await Axios.post(this.url, body)
      response = await Axios.get(this.url)
      this.setState({ persons: response.data })
    }
  }

  deletePerson = async (id) => {
    await Axios.delete(`${this.url}/${id}`)
    const persons = this.state.persons.filter(person => person.id !== id)
    this.setState({ persons })
  }

  render() {
    return (
      <div className="justify-content-around">
        <div className="col">
          <h2 className="font-weight-bold text-center"> Cadastro/Edição de Pessoas </h2>
          <small className="text-muted">Edite e Cadastre pessoas usando este formulário.</small>
          <FormPerson personCreate={this.create} />
        </div>
        <div className="col mt-4">
          <h2 className="font-weight-bold text-center"> Card de Pessoas </h2>
          <ListPerson persons={this.state.persons} deletePerson={this.deletePerson} />
        </div>
      </div>
    )
  }
}