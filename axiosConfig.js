import axios from 'axios'
export const instance = axios.create({
  baseURL: 'http://localhost:1337',
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer b3c10401855e7c7196541a8dc5f6fad70b194a8fcee5ecae00e55c2b24a909aacc656a0462cc72d2cc45e6c77eeb8ad9850c04d911d4de68acf38e176a7ce034aa6a9df0787ba4356f4babf8f7dc01a3d71e6a66afaf5585fa1eac338b8c01344bd72f465377888f06ec0a785ba368f21506c6232f740c23bd2cbe09fe30b0eb"
  }
})

export const BASEURL = 'http://localhost:1337'