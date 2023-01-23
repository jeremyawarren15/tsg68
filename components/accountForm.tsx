import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { FunctionComponent, useEffect } from "react";
import UserType from "../types/UserType";

type Props = {
  user: UserType
}

const AccountForm: FunctionComponent<Props> = ({user}) => {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const schema = yup.object().shape({
    name: yup.string().required("Name is required."),
    username: yup.string().required("Username is required."),
    email: yup.string().email("Invalid email.").required("Email is required."),
    phone_number: yup.string().matches(phoneRegex, "Invalid phone number.").required("Phone number is required.")
  })
  const { register, handleSubmit, reset, setValue, formState: { isSubmitSuccessful, errors}} = useForm({
    defaultValues: user,
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    fetch(`/api/users/${user.id}`, {
      method: "POST",
      body: JSON.stringify(data)
    }).then((data) => data.json()).then((response) => {
      setTimeout(() => {
        reset(data)
      }, 3000);
    })
  }

  const renderButton = () => {
    if (isSubmitSuccessful) {
      return (<Button variant="success">Saved!</Button>)
    }

    return (
      <Button type="submit">Save</Button>
    )
  }

  useEffect(() => {
    setValue("name", user?.name)
    setValue("username", user?.username)
    setValue("email", user?.email)
    setValue("phone_number", user?.phone_number)
  }, [setValue, user])

  return (
    <Form onSubmit={handleSubmit(onSubmit)} >
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" {...register("name")} isInvalid={!!errors.name} />
        <Form.Control.Feedback type="invalid" >
          {errors.name?.message as string}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" {...register("username")} isInvalid={!!errors.username} />
        <Form.Control.Feedback type="invalid" >
          {errors.username?.message as string}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" {...register("email")} isInvalid={!!errors.email} />
        <Form.Control.Feedback type="invalid" >
          {errors.email?.message as string}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" placeholder="Enter phone number" {...register("phone_number")} isInvalid={!!errors.phone_number} />
        <Form.Control.Feedback type="invalid" >
          {errors.phone_number?.message as string}
        </Form.Control.Feedback>
      </Form.Group>
      {renderButton()}
    </Form>
  )
}

export default AccountForm;