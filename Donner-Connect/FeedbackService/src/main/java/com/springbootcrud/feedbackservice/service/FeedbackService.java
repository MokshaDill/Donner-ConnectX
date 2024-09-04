package com.springbootcrud.feedbackservice.service;

import com.springbootcrud.feedbackservice.entity.Feedback;
import java.util.List;

public interface FeedbackService {
    Feedback saveFeedback(Feedback feedback);
    Feedback updateFeedback(Long id, Feedback feedback);
    void deleteFeedback(Long id);
    List<Feedback> getAllFeedback();
    Feedback getFeedbackById(Long id);
}

