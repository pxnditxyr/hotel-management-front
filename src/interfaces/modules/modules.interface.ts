
export interface ICategory {
  id: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  products?: IProduct[]
}

export interface IProduct {
  id: string
  name: string
  price: number
  stock: number
  imageUrl: string
  categoryId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  category?: ICategory | null
  orders?: IProductOrder[]
}

export interface IProductOrder {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  product?: IProduct | null
  order?: IOrder | null
}

export interface IOrder {
  id: string
  customerId: string
  method: string
  totalProducts: number
  totalAmount: number
  placedAt: string
  paymentStatus: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  customer?: ICustomer | null
  products?: IProductOrder[]
}

export interface ICustomer {
  id: string
  dni: string
  name: string
  lastname: string
  phone: string
  userId: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  orders?: IOrder[]
  reservations?: IReservation[]
  reports?: IReport[]
  user?: IUser | null
}

export interface IReservation {
  id: string
  customerId: string
  departmentId: string
  startDate: string
  endDate: string
  monetaryAdvance: number
  paymentStatus: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  customer?: ICustomer | null
  department?: IDepartment | null
  reports?: IReport[]
}

export interface IReport {
  id: string
  departmentId: string
  reservationId: string
  customerId: string
  name: string
  detail: string
  price: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  department?: IDepartment | null
  reservation?: IReservation | null
  customer?: ICustomer | null
}

export interface IUser {
  id: string
  name: string
  email: string
  username: string
  role: string
  imageUrl?: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  customer?: ICustomer | null
}

export interface IDepartment {
  id: string
  name: string
  number: number
  detail: string
  floorId: string
  departmentCategoryId: string
  imageUrl: string
  price: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  reservations: IReservation[]
  reports: IReport[]
  floor: IFloor
  departmentCategory: IDepartmentCategory
}

export interface IFloor {
  id: string
  name: string
  number: number
  detail: string
  imageUrl: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  departments?: IDepartment[]
}

export interface IDepartmentCategory {
  id: string
  name: string
  isActive: boolean
  createdAt: string
  updatedAt: string
  departments?: IDepartment[]
}

export interface IContactUs {
  id: string
  name: string
  email: string
  message: string
}
