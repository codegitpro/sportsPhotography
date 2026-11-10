package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.DiscusssheyingzuopinEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.DiscusssheyingzuopinView;


/**
 * 摄影作品评论表
 *
 * @author 
 * @email 
 * @date 2026-03-12 19:47:42
 */
public interface DiscusssheyingzuopinService extends IService<DiscusssheyingzuopinEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<DiscusssheyingzuopinView> selectListView(Wrapper<DiscusssheyingzuopinEntity> wrapper);
   	
   	DiscusssheyingzuopinView selectView(@Param("ew") Wrapper<DiscusssheyingzuopinEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<DiscusssheyingzuopinEntity> wrapper);
   	
   
}

