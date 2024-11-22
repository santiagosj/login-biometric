type ResidentKeyRequirement = "required" | "preferred" | "discouraged";
type AttestationConveyancePreference = "none" | "indirect" | "direct" | "enterprise";

export interface RegisterDeviceOptions {
    publicKey: {
        challenge: string;
        rp: {
            name: string;
        };
        user: {
            id: string;
            name: string;
            displayName: string;
        };
        pubKeyCredParams: Array<{ type: "public-key"; alg: number }>;
        authenticatorSelection: {
            residentKey: ResidentKeyRequirement;
        };
        timeout: number;
        attestation: AttestationConveyancePreference | undefined;
    };
}

export interface ServerResponse {
    status: number;
    message: string;
    options?: RegisterDeviceOptions;
}