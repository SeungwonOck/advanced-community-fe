import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as fullHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import "../style/campaignDetail.style.css";
import { campaignActions } from '../action/campaignAction';


const CampaignDetail = () => {
    const { user } = useSelector((state) => state.user);
    const { id } = useParams();
    const [newComment, setNewComment] = useState("");
    const { selectedCampaign } = useSelector((state) => state.campaign);
    const campaignDefaultImage = "https://info.mssmedia.com/hubfs/Misc%20Images/60255e7341de62c988dd08aa_DigitalAdvertising.jpg";
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const createComment = (e) => {
        e.preventDefault();
        dispatch(campaignActions.createComment(id, newComment))
        setNewComment("");
    }

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            dispatch(campaignActions.getCampaignDetail(id))
        }
    }, [user, id, dispatch])

    const toggleLike = (id) => {
        dispatch(campaignActions.toggleLike(id))
    }

    if (!selectedCampaign) {
        return <div>Loading...</div>;
    }

    return (
        <div className="campaign-detail">
            <div className="campaign-header">
                <img 
                    src={selectedCampaign.image || campaignDefaultImage} 
                    alt="Campaign" 
                    className="campaign-image" 
                />

                <div className="campaign-role">
                    {selectedCampaign.author.role === "business" ? "B" 
                    : selectedCampaign.author.role === "normal" ? "N" 
                    : "A"}
                </div>
            </div>

            <div className="campaign-content">
                <h1>{selectedCampaign.title}</h1>
                <div className="campaign-info">
                    <div className="author-details">
                        <img 
                            src={selectedCampaign.author.profileImage} 
                            alt="Author" 
                            className="author-profile-image" 
                        />
                        <div>
                            <p className="author-name">{selectedCampaign.author.userName}</p>
                            <p className="posted-date">
                                Posted at {selectedCampaign.createAt.date} {selectedCampaign.createAt.time}
                            </p>
                        </div>
                    </div>

                    <div className="likes" onClick={() => toggleLike(selectedCampaign._id)}>
                        <FontAwesomeIcon icon={selectedCampaign?.userLikes.some(like => like._id === user._id) ? fullHeart : emptyHeart} className="red-color mr-1"/> 
                        <span>{selectedCampaign?.likes}</span>
                    </div>
                </div>

                <p className="campaign-description">
                    {selectedCampaign.description}
                </p>
            </div>

            <div className="comments-section">
                <h2>Comments ({selectedCampaign.comments.length || '0'})</h2>
                
                {selectedCampaign.comments.length === 0 ? (
                    <p>There is no comments yet.</p>
                ) : (
                    selectedCampaign.comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <div className="comment-header">
                                <div className="comment-author">
                                    <img 
                                        src={comment.author.profileImage} 
                                        alt="Comment Author" 
                                        className="comment-author-image" 
                                    />
                                    <p className="comment-author-name">{comment.author.userName}</p>
                                </div>
                                <p className="comment-date">{comment.createAt.date}</p>
                            </div>
                            <p className="comment-text">{comment.content}</p>
                        </div>
                    ))
                )}

                <form className="add-comment" onSubmit={createComment}>
                    <div>
                        <textarea
                            className="comment-textarea"
                            rows={3}
                            placeholder='Please write comment.'
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='post-comment-btn blue-btn'>Post Comment</button>
                </form>
            </div>
        </div>
    )
}

export default CampaignDetail;
