interface KeyObjI {
  [key:string]: KeyObjDataI
}

interface KeyObjDataI {
  type: number
  created: number
  user: string
  pass: string
  text: string
}

//from GUI
interface PlainKeyObjI extends KeyObjDataI {
  title: string
  oldTitle: string
  skip: boolean
}