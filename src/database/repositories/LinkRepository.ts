import { doc, getDoc, updateDoc } from "firebase/firestore";
import { database } from "../../../src/config/firebase";
import redis from "redis";
class LinkRepository {
  static async updateLink(docId) {
    let setCurrentIndex = 0;

    const docRef = doc(database, "multiLinks", docId);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      const linksData = data?.links || [];
      const currentIndex = data?.currentIndex || 0;

      if (linksData.length > 0) {
        const newIndex =
          currentIndex < linksData.length - 1 ? currentIndex + 1 : 0;
        setCurrentIndex = newIndex;
        await this.UpdateCurrentIndex(newIndex, docId);
        const newLinks = linksData.map((item: any) => item.link);
        return newLinks[setCurrentIndex];
      } else {
        console.log("No links found in the document.");
      }
    } else {
      console.log("Document not found.");
    }
  }

  static async UpdateCurrentIndex(index, docId) {
    try {
      const docRef = doc(database, "multiLinks", docId);
      await updateDoc(docRef, { currentIndex: index });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default LinkRepository;
