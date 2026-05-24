import { addResult, getMyResults, getAllResults } from "../services/result.js";
import { resMsg } from "../utils/globaleMessage.js";

export const add = async (req, res) => {
    const result = await addResult(req);
    resMsg(res, 201, "تم حفظ النتيجة بنجاح", result);
};

export const myResults = async (req, res) => {
    const results = await getMyResults(req);
    resMsg(res, 200, "تم جلب النتائج بنجاح", results);
};

export const allResults = async (req, res) => {
    const results = await getAllResults(req);
    resMsg(res, 200, "تم جلب جميع النتائج بنجاح", results);
};
