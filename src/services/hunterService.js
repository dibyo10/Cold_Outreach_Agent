import axios from "axios";
import { isFounderRole } from "../utils/roleFilter.js";
import emailSchema from "../utils/emailSchema.js";

async function FinHunterEmails(domain, apiKey) {
    try {
        const response = await axios.get(
            "https://api.hunter.io/v2/domain-search",
            {
                params: { domain, api_key: apiKey },
            }
        );

        const emails = response.data.data.emails || [];

        return emails.filter((email) => {
                if (!email.value) return false;
                const isValid = emailSchema.safeParse(email.value).success;

                if (!isValid) return false;

                return (
                    email.confidence > 70 && isFounderRole(email.position)
                );
            })
            .map((email) => ({
                email: email.value,
                confidence: email.confidence,
                position: email.position,
            }));

    } catch (error) {
        console.error("Hunter error:", error.response?.data);
        return [];
    }
}

export default FinHunterEmails;