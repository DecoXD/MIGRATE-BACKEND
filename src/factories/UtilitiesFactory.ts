import { ITokenManipulator } from "../utilities/interfaces";
import { TokenManipulator } from "../utilities/Token";

export class UtilitiesFactory{

  static  MakeTokenManipulator():ITokenManipulator{
    return new TokenManipulator()
  }

}