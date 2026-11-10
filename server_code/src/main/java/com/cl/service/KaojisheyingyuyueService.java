package com.cl.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.cl.utils.PageUtils;
import com.cl.entity.KaojisheyingyuyueEntity;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.KaojisheyingyuyueView;


/**
 * 考级摄影预约
 *
 * @author 
 * @email 
 * @date 2026-03-12 19:47:41
 */
public interface KaojisheyingyuyueService extends IService<KaojisheyingyuyueEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<KaojisheyingyuyueView> selectListView(Wrapper<KaojisheyingyuyueEntity> wrapper);
   	
   	KaojisheyingyuyueView selectView(@Param("ew") Wrapper<KaojisheyingyuyueEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<KaojisheyingyuyueEntity> wrapper);
   	
   
}

