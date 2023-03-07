export const mapVirtualId = (schema) => {
	schema.virtual('id').get(function () {
		return this._id.toString();
	});
	schema.set('toJSON', { virtuals: true });
	schema.set('toObject', { virtuals: true });
};
