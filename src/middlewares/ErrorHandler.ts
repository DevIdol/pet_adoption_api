import { NextFunction, Request, Response } from "express";

export const ErrorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errorStatus = err.status || 500;
	const errorMessage = err.message || "Something Wrong.";
	return res.status(errorStatus).json({
		success: false,
		status: errorStatus,
		message: errorMessage,
		stack: err.stack,
	});
};
