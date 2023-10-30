import LinkRepository from "../database/repositories/LinkRepository";

export default class linkService {
  static async update(docId) {
    try {
      const record = await LinkRepository.updateLink(docId);
      return record;
    } catch (error) {
      throw error;
    }
  }



  
}
