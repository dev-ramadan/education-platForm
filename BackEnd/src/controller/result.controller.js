import { addResult, getMyResults } from "../services/result.js";
import { resMsg } from "../utils/globaleMessage.js";

export const add = async (req, res) => {
    const result = await addResult(req);
    resMsg(res, 201, "تم حفظ النتيجة بنجاح", result);
};

export const myResults = async (req, res) => {
    const results = await getMyResults(req);
    resMsg(res, 200, "تم جلب النتائج بنجاح", results);
};
