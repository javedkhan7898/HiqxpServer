import 'dotenv/config';
import validate from '../../validations/variable.validation';
//import validate from '../validations/variable.validation';



class Variable {
  public static readonly NODE_ENV: string = process.env.NODE_ENV!

  public static readonly PORT: number = Number(process.env.PORT)!

  public static readonly DATABASE_URL: string = "mongodb+srv://xenpark:xenpark@xp-crud-cluster0.vkjz3vp.mongodb.net/?retryWrites=true&w=majority";//process.env.DATABASE_URL!
 
public static readonly JWT_SECRET: string =  "secret";//process.env.JWT_SECRET!

public static readonly PASS_SECRET: string = "secret";//process.env.PASS_SECRET!

  constructor() {
    this.initialise()
  }

  private initialise(): void {
    validate()
  }
}

export default Variable
