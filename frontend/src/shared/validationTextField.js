export const validationLogin = (email, password) => {
  let val = {
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  }

  if (!email) {
    val.email.error = true
    val.email.message = "email must not empty"
  } else if (!email.includes("@")) {
    val.email.error = true
    val.email.message = "please use valid email"
  }
  if (!password) {
    val.password.error = true
    val.password.message = "password must not empty"
  } else if (password.length < 6) {
    val.password.error = true
    val.password.message = "min character length 6"
  }

  if (!val.email.error && !val.email.password) {
    val = {
      email: {
        error: false,
        message: "",
      },
      password: {
        error: false,
        message: "",
      },
    }
  }
  return { updatedValue: val, errorValidate: val.email.error || val.password.error }
}
export const validationPost = (title, content, image) => {
  let val = {
    title: {
      error: false,
      message: "",
    },
    content: {
      error: false,
      message: "",
    },
    image: {
      error: false,
      message: "",
    },
  }

  if (!title) {
    val.title.error = true
    val.title.message = "title must not empty"
  }
  if (!content) {
    val.content.error = true
    val.content.message = "content must not empty"
  } else if (content.length < 10) {
    val.content.error = true
    val.content.message = "min character length 10"
  }
  if (!image) {
    val.image.error = true
    val.image.message = "image must filled"
  }

  if (!val.title.error && !val.content.error && !val.image.error) {
    val = {
      title: {
        error: false,
        message: "",
      },
      content: {
        error: false,
        message: "",
      },
      image: {
        error: false,
        message: "",
      },
    }
  }
  return {
    updatedValue: val,
    errorValidate: val.image.error || val.title.error || val.content.error,
  }
}

export const validationRegister = (name, email, password, confirmPassword) => {
  let val = {
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    name: {
      error: false,
      message: "",
    },
    confirmPassword: {
      error: false,
      message: "",
    },
  }
  if (!email) {
    val.email.error = true
    val.email.message = "email must not empty"
  } else if (!email.includes("@")) {
    val.email.error = true
    val.email.message = "please use valid email"
  }
  if (!name) {
    val.name.error = true
    val.name.message = "name must not empty"
  }
  if (!confirmPassword) {
    val.confirmPassword.error = true
    val.confirmPassword.message = "confirm password must not empty"
  } else if (confirmPassword !== password) {
    val.confirmPassword.error = true
    val.confirmPassword.message = "confirm password does not match"
  }

  if (!password) {
    val.password.error = true
    val.password.message = "password must not empty"
  } else if (password.length < 6) {
    val.password.error = true
    val.password.message = "min character length 6"
  }

  if (!val.name.error && !val.email.error && !val.password.error && !val.confirmPassword.error) {
    val = {
      email: {
        error: false,
        message: "",
      },
      password: {
        error: false,
        message: "",
      },
      name: {
        error: false,
        message: "",
      },
      confirmPassword: {
        error: false,
        message: "",
      },
    }
  }
  return {
    updatedValue: val,
    errorValidate:
      val.email.error || val.password.error || val.name.error || val.confirmPassword.error,
  }
}
export const validationUserUpdate = (name, email, password, confirmPassword) => {
  let val = {
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
    name: {
      error: false,
      message: "",
    },
    confirmPassword: {
      error: false,
      message: "",
    },
  }
  if (!email) {
    val.email.error = true
    val.email.message = "email must not empty"
  } else if (!email.includes("@")) {
    val.email.error = true
    val.email.message = "please use valid email"
  }
  if (!name) {
    val.name.error = true
    val.name.message = "name must not empty"
  }
  if (confirmPassword !== password) {
    val.confirmPassword.error = true
    val.confirmPassword.message = "confirm password does not match"
  }

  if (!val.name.error && !val.email.error && !val.password.error && !val.confirmPassword.error) {
    val = {
      email: {
        error: false,
        message: "",
      },
      password: {
        error: false,
        message: "",
      },
      name: {
        error: false,
        message: "",
      },
      confirmPassword: {
        error: false,
        message: "",
      },
    }
  }
  return {
    updatedValue: val,
    errorValidate:
      val.email.error || val.password.error || val.name.error || val.confirmPassword.error,
  }
}
export const validationShipping = (address, city, postalCode, country) => {
  let val = {
    address: {
      error: false,
      message: "",
    },
    city: {
      error: false,
      message: "",
    },
    postalCode: {
      error: false,
      message: "",
    },
    country: {
      error: false,
      message: "",
    },
  }
  if (!address) {
    val.address.error = true
    val.address.message = "address must not empty"
  }
  if (!city) {
    val.city.error = true
    val.city.message = "city must not empty"
  }
  if (!postalCode) {
    val.postalCode.error = true
    val.postalCode.message = "postal code must not empty"
  }
  if (!country) {
    val.country.error = true
    val.country.message = "country must not empty"
  }

  if (!val.city.error && !val.address.error && !val.postalCode.error && !val.country.error) {
    val = {
      address: {
        error: false,
        message: "",
      },
      postalCode: {
        error: false,
        message: "",
      },
      city: {
        error: false,
        message: "",
      },
      country: {
        error: false,
        message: "",
      },
    }
  }
  return {
    updatedValue: val,
    errorValidate: val.address.error || val.postalCode.error || val.city.error || val.country.error,
  }
}
