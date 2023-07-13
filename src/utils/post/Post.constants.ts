// export const FolderName: FolderName = {
// 	"01_w": "w",
// 	"02_a": "a",
// 	"03_js": "j",
// 	"04_ts": "t",
// };

const PostCollection = (collection: Description) => {
	return {
		user_id: collection.useId,
		description: collection.description,
		title: collection.title,
		tags: collection.tags,
		created_at: collection.date,
	};
};
