<div class="modal fade" id="editCommentModal" tabindex="-1" aria-labelledby="editCommentBoxModal" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Edit Comment</h5>
                <button type="button" class="close-edit-comment-modal" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="edit-comment-box-form" class="comment-form">
                    @csrf
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input id="edit_author_name" type="text" class="form-control" name="edit_author_name"
                            value="" required autocomplete="edit_author_name" autofocus
                            placeholder="Type your name" style="background-color: rgb(255, 255, 255);">
                        <div id="edit_author_name_error" class="error-message text-center"></div>
                    </div>

                    <div class="form-group">
                        <label for="edit_comment">Comment</label>
                        <textarea name="edit_comment" id="edit_comment" msg cols="30" rows="5" placeholder="Type your comment"
                            class="form-control" style="background-color: rgb(255, 255, 255);"></textarea>
                        <div id="edit_comment_error" class="error-message text-center"></div>
                    </div>

                    {{-- comment id hidden input field for sending to backend --}}
                    <input type="number" name="comment_id" id="comment_id" value="" hidden>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" id="comment-edit-submit-btn" class="btn btn-primary">Edit Comment</button>
                <button hidden disabled type="button" class="btn btn-primary" id="loadingEditSubmittingBtn">
                    <i class="fa fa-spinner fa-spin me-3"></i>Loading
                </button>
            </div>
        </div>
    </div>
</div>
